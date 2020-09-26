//@ts-check
import { combineReducers } from '@reduxjs/toolkit'
import userAuthReducer from '@js/store/features/UserSlice'
import workingEventReducer from '@js/store/features/EventSlice'
import customerBalanceReducer from '@js/store/features/BalanceSlice'
import { productTemplateReducer, eventTemplatesReducer } from '../features/product/TemplatesSlice'
import { DESTROY_SESSION } from '../action/types'
import { eventQrcodeLogoUrlReducer } from '../features/product/QrcodeLogoSlice'
import { EventStatusReducer } from '../features/product/EventStatusSlice'

const appReducer = combineReducers({
    userAuth: userAuthReducer,
    workingEvent: workingEventReducer,
    customerBalance: customerBalanceReducer,
    productTemplateEdit: productTemplateReducer,
    eventTemplates: eventTemplatesReducer,
    eventQrcodeLogoUrl: eventQrcodeLogoUrlReducer,
    EventStatus: EventStatusReducer,
})

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION)
        state = undefined;
    return appReducer(state, action);
};

export default rootReducer;