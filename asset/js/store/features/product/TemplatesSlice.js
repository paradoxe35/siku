import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import Async from '@js/store/async'

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


//@ts-check

export const fetchEventTemplates = Async.fetchAsync('events/fetchTemplates')

const eventTemplatesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const eventTemplatesSlice = createSlice({
    name: 'eventTemplates',
    initialState: eventTemplatesAdapter.getInitialState(Async.initialState),
    reducers: {
        eventTemplateAdded: eventTemplatesAdapter.addOne,
        eventTemplateRemoved: eventTemplatesAdapter.removeOne,
    },
    extraReducers: Async.extraReducers(fetchEventTemplates, eventTemplatesAdapter)
})

export const {
    eventTemplateAdded,
    eventTemplateRemoved,
} = eventTemplatesSlice.actions
export const eventTemplatesReducer = eventTemplatesSlice.reducer