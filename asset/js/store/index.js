import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
    reducer: rootReducer,
    middleware: []
})

export const { dispatch: ReduxDispatch } = store
export default store