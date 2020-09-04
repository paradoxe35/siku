import { combineReducers } from '@reduxjs/toolkit'
import userAuthReducer from '@js/store/features/UserSlice'
import workingEventReducer from '@js/store/features/EventSlice'

export default combineReducers({
    userAuth: userAuthReducer,
    workingEvent: workingEventReducer
})
