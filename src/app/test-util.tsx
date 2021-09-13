// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Import your own reducers
import counterReducer from '../features/counter/counterSlice';
import initReducer from './../minima.init'
import metricHistoryReducer from './../features/metricHistory/metricHistorySlice'


// https://redux.js.org/usage/writing-tests#connected-components

function render(
    ui: any,
    {
        preloadedState,
        store = configureStore({ reducer: {
            counter: counterReducer,
            init: initReducer,
            metricHistory: metricHistoryReducer
        }, preloadedState }),
        ...renderOptions
    }: any = {}
) {
    function Wrapper(myObj: any) {
        return <Provider store={store}>{myObj.children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }   