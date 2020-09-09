import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiRequest } from '@/js/api/api'


const INITIALSTATE = {
    sms: null,
    whatsapp: null,
    templatename: null
}

const productTemplateLastText = createSlice({
    name: 'productTemplateLastText',
    initialState: INITIALSTATE,
    reducers: {
        setLastTemplateEdit: (state, { payload }) => {
            state = payload
            return state
        },
        setTemplateTextAreaValue: (state, { payload }) => {
            state = {
                templatename: state.templatename,
                ...payload
            }
            return state
        },
        setTemplateNameValue: (state, { payload }) => {
            state.templatename = payload
            return state
        },
        clearTemplateEdit: (state, { payload }) => {
            state = INITIALSTATE
            return state
        }
    }
})

export const {
    setLastTemplateEdit,
    clearTemplateEdit,
    setTemplateNameValue,
    setTemplateTextAreaValue
} = productTemplateLastText.actions

export const productTemplateReducer = productTemplateLastText.reducer


const onePerEvent = (event_id, workingEvent) => {
    return event_id !== null && event_id == workingEvent.id
}

const getDatas = (payload) => (typeof payload !== 'object' ? [] : payload)

// get templates

export const fetchEventTemplates = createAsyncThunk(
    'events/fetchTemplates',
    async (url, { getState, requestId }) => {
        const { eventTemplates: { currentRequestId, loading, event_id, entities }, workingEvent } = getState()
        if (loading !== 'pending' || requestId !== currentRequestId || onePerEvent(event_id, workingEvent)) {
            return { data: Object.keys(entities).map(k => entities[k]), event_id: workingEvent.id }
        }
        const { data: { data } } = await ApiRequest('get', url, {}, true)
        return { data, event_id: workingEvent.id }
    }
)

const eventTemplatesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const eventTemplatesSlice = createSlice({
    name: 'eventTemplates',
    initialState: eventTemplatesAdapter.getInitialState({
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
        event_id: null
    }),
    reducers: {
        eventTemplateAdded: eventTemplatesAdapter.addOne,
        eventTemplateRemoved: eventTemplatesAdapter.removeOne,
    },
    extraReducers: {
        [fetchEventTemplates.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [fetchEventTemplates.fulfilled]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                eventTemplatesAdapter.setAll(state, getDatas(action.payload.data))
                state.currentRequestId = undefined
                state.event_id = action.payload.event_id
            }
        },
        [fetchEventTemplates.rejected]: (state, action) => {
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
            }
        }
    }
})

export const {
    eventTemplateAdded,
    eventTemplateRemoved,
} = eventTemplatesSlice.actions
export const eventTemplatesReducer = eventTemplatesSlice.reducer