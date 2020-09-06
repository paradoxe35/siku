import { combineReducers } from '@reduxjs/toolkit'
import userAuthReducer from '@js/store/features/UserSlice'
import workingEventReducer from '@js/store/features/EventSlice'
import customerBalanceReducer from '@js/store/features/BalanceSlice'

export default combineReducers({
    userAuth: userAuthReducer,
    workingEvent: workingEventReducer,
    customerBalance: customerBalanceReducer
})
