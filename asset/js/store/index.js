import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const { dispatch: ReduxDispatch } = store
export default store