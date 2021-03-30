import { createSlice } from '@reduxjs/toolkit'

const INITIALSTATE = {
    balance: 0
}

const customerBalance = createSlice({
    name: 'customerBalance',
    initialState: INITIALSTATE,
    reducers: {
        incrementBalanceAmount: (state, { payload }) => {
            state.balance += payload
            return state
        },
        setBalanceAmount: (state, { payload }) => {
            state.balance = payload
            return state
        },
        setBalance: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const { incrementBalanceAmount, setBalance, setBalanceAmount } = customerBalance.actions

export default customerBalance.reducer
