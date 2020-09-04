import { createSlice } from '@reduxjs/toolkit'

const INITIALSTATE = null

const authUser = createSlice({
    name: 'userAuth',
    initialState: INITIALSTATE,
    reducers: {
        connectUser: (state, action) => (state = action.payload),
        disconnectUser: state => (state = INITIALSTATE)
    }
})

export const { connectUser, disconnectUser } = authUser.actions

export default authUser.reducer
