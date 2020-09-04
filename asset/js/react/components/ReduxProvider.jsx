//@ts-check
import React from 'react'
import { Provider } from 'react-redux'
import store from '@js/store'

const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>

export default ReduxProvider