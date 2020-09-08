//@ts-check
import React from 'react'
import { Provider } from 'react-redux'
import store from '@js/store'
import ErrorBoundary from './ErrorBoundary'

const ReduxProvider = ({ children }) => <Provider store={store}>
    {/* <ErrorBoundary> */}
        {children}
    {/* </ErrorBoundary> */}
</Provider>

export default ReduxProvider