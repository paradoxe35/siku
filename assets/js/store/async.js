//@ts-check
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiRequest } from "../api/api"

export const onePerEvent = (event_id, workingEvent) => {
    return event_id !== null && event_id == workingEvent.id
}

export const getDatas = (payload) => (typeof payload !== 'object' ? [] : payload)

const fetchAsync = (prefix, state, refresh = true) => createAsyncThunk(
    prefix,
    async (url, { getState, requestId }) => {
        // @ts-ignore
        const { [state]: { currentRequestId, loading, event_id, entities }, workingEvent } = getState()
        if (loading !== 'pending' || requestId !== currentRequestId || (refresh ? onePerEvent(event_id, workingEvent) : event_id !== null)) {
            return { data: Object.keys(entities).map(k => entities[k]), event_id: workingEvent.id }
        }
        // @ts-ignore
        const { data: { data } } = await ApiRequest('get', url, {}, true)
        return { data, event_id: workingEvent.id }
    }
)


export default {
    fetchAsync,
    initialState: {
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
        event_id: null
    },
    extraReducers: (asyncFetch, adapter) => ({
        ...{
            // @ts-ignore
            [asyncFetch.pending]: (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                    state.currentRequestId = action.meta.requestId
                }
            },
            // @ts-ignore
            [asyncFetch.fulfilled]: (state, action) => {
                const { requestId } = action.meta
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle'
                    adapter.setAll(state, getDatas(action.payload.data))
                    state.currentRequestId = undefined
                    state.event_id = action.payload.event_id
                }
            },
            // @ts-ignore
            [asyncFetch.rejected]: (state, action) => {
                const { requestId } = action.meta
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle'
                    state.error = action.error
                    state.currentRequestId = undefined
                }
            }
        }
    })
};