import { createSlice } from '@reduxjs/toolkit'

const INITIALSTATE = null

const workingEvent = createSlice({
    name: 'userAuth',
    initialState: INITIALSTATE,
    reducers: {
        setCurrentEvent: (state, action) => (state = action.payload),
        unsetEvent: state => (state = INITIALSTATE)
    }
})

export const { setCurrentEvent, unsetEvent } = workingEvent.actions

export default workingEvent.reducer
