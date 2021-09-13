// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// for chart.js, mock canvas implementation in jest browser
import 'jest-canvas-mock';
jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
    Line: () => null
}));

// Mocking minima.js
import { Minima } from 'minima';
jest.mock('minima');

import * as mockMetricHistorySQLResponse from './features/metricHistory/components/tests/metricHistorySQLMockResponse.json'
Minima.sql = jest.fn((query, callback) => {
    if (query === 'SELECT * FROM metrics;') {
        console.log('Mocking Minima "SELECT * FROM metrics"')
        callback(mockMetricHistorySQLResponse)
    } else {
        console.error('Can not mock unknown Minima SQL call', query)
    }
})
