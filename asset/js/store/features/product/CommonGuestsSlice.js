//@ts-check
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import Async from '@js/store/async'


export const fetchCommonGuest = Async.fetchAsync('guests/common', 'commonGuests', false)

const comminGuestsAdapter = createEntityAdapter({
    sortComparer: (a, b) =>  b.id - a.id
})

const commonGuestsSlice = createSlice({
    name: 'commonGuests',
    initialState: comminGuestsAdapter.getInitialState(Async.initialState),
    reducers: {
        commonGuestAdded: comminGuestsAdapter.addOne,
        commonGuestRemoved: comminGuestsAdapter.removeOne,
    },
    extraReducers: Async.extraReducers(fetchCommonGuest, comminGuestsAdapter)
})

export const {
    commonGuestAdded,
    commonGuestRemoved,
} = commonGuestsSlice.actions
export const commonGuestsReducer = commonGuestsSlice.reducer