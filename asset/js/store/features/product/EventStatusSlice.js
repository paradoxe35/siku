import { createSlice } from '@reduxjs/toolkit'

const INITIALSTATE = {
    guests: 0,
    used_amount: 0,
    sended: 0,
    saved_guests: 0
}

const EventStatus = createSlice({
    name: 'EventStatus',
    initialState: INITIALSTATE,
    reducers: {
        setEventStatus: (state, { payload }) => {
            state = payload
            return state
        },
        putEventStatus: (state, { payload }) => {
            state = {
                ...state,
                payload
            }
            return state
        },
    }
})

export const { setEventStatus, putEventStatus } = EventStatus.actions

export const EventStatusReducer = EventStatus.reducer