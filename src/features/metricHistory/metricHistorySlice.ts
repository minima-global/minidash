import { RootState, AppThunk } from './../../app/store';
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import { Metric } from './types/Metric'
import { Minima, NetworkStatus } from 'minima';



export interface MetricState {
    history: Metric[];
    currentStatus: NetworkStatus | null,
}

const initialMetricsState: MetricState = {
    history: [],
    currentStatus: null
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const minimaGetMetrics = createAsyncThunk(
    'metricHistory/getMetrics',
    async () => {
        const response: Metric[] = await new Promise((resolve, reject) => {
            Minima.sql('SELECT * FROM metrics;', (res) => {
                const success = res.response[0].status
                const statusHistoryData: any = res.response[0].rows
                if (success) {
                    const sh: Metric[] = statusHistoryData.map((metric: any) => {
                        return new Metric(
                            metric.CHAINLENGTH,
                            metric.CHAINSPEED,
                            metric.CHAINWEIGHT,
                            metric.ID,
                            metric.RAM,
                            metric.TIME,
                            metric.DIFFICULTY,
                            metric.BLOCKNUMBER,
                            metric.TRANSACTIONCOUNT)
                    })
                    resolve(sh)
                } else {
                    const message = res.response[0].message
                    reject(message)
                }
            })
        })
        return response
    }
);


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const minimaGetStatus = createAsyncThunk(
    'metricHistory/getStatus',
    async () => {
        const response = await new Promise((resolve, reject) => {
            Minima.cmd('status', (respJSON: any)=> {
                const status: NetworkStatus = respJSON.response;
                resolve(status)
            })
        })
        return response
    }
);

export const metricsSlice = createSlice({
    name: 'metricHistory',
    initialState: initialMetricsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(minimaGetMetrics.fulfilled, (state, action) => {
                state.history = action.payload;
            });
    },
});


// export reducers and actions
const { actions, reducer } = metricsSlice

export default reducer;




// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const newBlock = (msg: any): AppThunk => (dispatch, getState) => {
    dispatch(minimaGetMetrics())
    dispatch(minimaGetStatus())
};



// export const selectCount = (state: RootState) => state.counter.value;

// export const selectChainSpeedHistory = (state: RootState) => [];
// export const selectChainWeightHistory = (state: RootState) => [];
// export const selectDifficultyHistory = (state: RootState) => [];
// export const selectRamHistory = (state: RootState) => [];
// export const selectTransactionCountHistory = (state: RootState) => [];


// export const select1H = (state: RootState) => [];

