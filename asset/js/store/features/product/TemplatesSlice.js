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


// get templates

export const fetchEventTemplates = createAsyncThunk(
    'events/fetchTemplates',
    async (url, { getState, requestId }) => {
        const { currentRequestId, loading } = getState().eventTemplates
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return
        }
        const { data: rdata } = await ApiRequest('get', url, {}, true)
        return rdata.data
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
        error: null
    }),
    reducers: {
        eventTemplateAdded: eventTemplatesAdapter.addOne,
        eventTemplateRemoved: eventTemplatesAdapter.removeOne,
        eventTemplateUpdated: eventTemplatesAdapter.updateOne
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
                eventTemplatesAdapter.setAll(state, typeof action.payload !== 'object' ? [] : action.payload)
                state.currentRequestId = undefined
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
    eventTemplateUpdated
} = eventTemplatesSlice.actions
export const eventTemplatesReducer = eventTemplatesSlice.reducer