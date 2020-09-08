import { combineReducers } from '@reduxjs/toolkit'
import userAuthReducer from '@js/store/features/UserSlice'
import workingEventReducer from '@js/store/features/EventSlice'
import customerBalanceReducer from '@js/store/features/BalanceSlice'
import { productTemplateReducer, eventTemplatesReducer } from '../features/product/TemplatesSlice'

export default combineReducers({
    userAuth: userAuthReducer,
    workingEvent: workingEventReducer,
    customerBalance: customerBalanceReducer,
    productTemplateEdit: productTemplateReducer,
    eventTemplates: eventTemplatesReducer
})
