import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import initReducer from './../minima.init'
import metricHistoryReducer from './../features/metricHistory/metricHistorySlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        init: initReducer,
        metricHistory: metricHistoryReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
