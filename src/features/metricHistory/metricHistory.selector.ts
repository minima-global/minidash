import { createSelector } from '@reduxjs/toolkit'
import { Metric } from './types/Metric'
import { format, add, isAfter } from 'date-fns'
import { RootState } from '../../app/store'


const selectMetricHistory = (state: RootState) => state.metricHistory.history


const extractRamPoint = (row: Metric) => {
    return {
        x: row.time,
        y: row.ram,
        label: format(row.time,'HH:mm')
    }
}

const extractChainSpeedPoint = (row: Metric) => {
    return {
        x: row.time,
        y: row.chainspeed,
        label: format(row.time,'HH:mm')
    }
}

const extractChainWeightPoint = (row: Metric) => {
    return {
        x: row.time,
        y: row.chainweight,
        label: format(row.time,'HH:mm')
    }
}

const extractDifficultyPoint = (row: Metric) => {
    return {
        x: row.time,
        y: row.difficulty,
        label: format(row.time,'HH:mm')
    }
}

const extractTransactionCountPoint = (row: Metric) => {
    return {
        data: row.transactionCount,
        label: row.blockNumber
    }
}

const extractRamHistory = (metrics: Metric[]) => {
    return metrics.map(extractRamPoint)
}

const extractChainSpeedHistory = (metrics: Metric[]) => {
    return metrics.map(extractChainSpeedPoint)
}

const extractChainWeightHistory = (metrics: Metric[]) => {
    return metrics.map(extractChainWeightPoint)
}

const extractDifficultyHistory = (metrics: Metric[]) => {
    return metrics.map(extractDifficultyPoint)
}

const extractTransactionCountHistory = (metrics: Metric[]) => {
    return metrics.map(extractTransactionCountPoint)
}


// Memoised with reselect from redux toolkit
export const selectRamHistory = createSelector(selectMetricHistory, extractRamHistory)
export const selectChainSpeedHistory = createSelector(selectMetricHistory, extractChainSpeedHistory)
export const selectChainWeightHistory = createSelector(selectMetricHistory, extractChainWeightHistory)
export const selectDifficultyHistory = createSelector(selectMetricHistory, extractDifficultyHistory)
export const selectTransactionCountHistory  = createSelector(selectMetricHistory, extractTransactionCountHistory)


// Get date for chart label
const getMetricHistoryDate = (metrics: Metric[]) => {
    return format(metrics[0].time, 'MMMM dd')
}
export const selectMetricHistoryDate = createSelector(selectMetricHistory, getMetricHistoryDate)
