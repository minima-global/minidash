import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import { Minima, NetworkStatus } from 'minima';
import { RootState, AppThunk } from './app/store';
import { newBlock, minimaGetMetrics } from './features/metricHistory/metricHistorySlice'

export interface InitState {
    connected: boolean;
    latestMessage: string;
}

const initialState: InitState = {
    connected: false,
    latestMessage: ''
};

const enum MinimaEventTypes {
    CONNECTED = 'connected',
    NEWBLOCK = 'newblock',
    NEWTRANSACTION = 'newtransaction',
    NEWTXPOW = 'newtxpow',
    NEWBALANCE = 'newbalance',
    NETWORK = 'network',
    TXPOWSTART = 'txpowstart',
    TXPOWEND = 'txpowend'
}

export const initSlice = createSlice({
    name: 'init',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      initSuccess: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.connected = true
      },
      chainMessage: (state, action) => {
        state.latestMessage = action.payload;
      }
    }
});

// export reducers and actions
const { actions, reducer } = initSlice
export const { initSuccess, chainMessage } = actions;
export default reducer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const minimaInit = (): AppThunk => (dispatch, getState) => {
    Minima.init((msg: any) => {
        switch(msg.event) {
            case MinimaEventTypes.CONNECTED:
                dispatch(initSuccess())
                dispatch(minimaGetMetrics())
                break;
            case MinimaEventTypes.NEWBLOCK:
                dispatch(newBlock(msg.info))
                break;
            case MinimaEventTypes.NEWTRANSACTION:
                dispatch(newTransaction(msg.info))
                break;
            case MinimaEventTypes.NEWTXPOW:
                dispatch(newTxPow(msg.info))
                break;
            case MinimaEventTypes.NEWBALANCE:
                dispatch(newBalance(msg.info))
                break;
            case MinimaEventTypes.NETWORK:
                dispatch(network(msg.info))
                break;
            case MinimaEventTypes.TXPOWSTART:
                dispatch(txPowStart(msg.info))
                break;
            case MinimaEventTypes.TXPOWEND:
                dispatch(txPowEnd(msg.info))
                break;
            default:
                console.error('Unknown event type: ', msg.event)
        }
        
        dispatch(chainMessage(msg))
    })
};


// export const newBlock = createAction<any>('MINIMA_NEW_BLOCK');
export const newTransaction = createAction<any>('MINIMA_NEW_TRANSACTION');
export const newTxPow = createAction<any>('MINIMA_NEW_TXPOW');
export const newBalance = createAction<any>('MINIMA_NEW_BALANCE');
export const network = createAction<any>('MINIMA_NETWORK');
export const txPowStart = createAction<any>('TX_POW_START');
export const txPowEnd = createAction<any>('TX_POW_END');
