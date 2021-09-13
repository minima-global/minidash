import stateData from './state.raw.mock'
import { add } from 'date-fns'

// make the time field a date object
const updatedStateData = stateData.metricHistory.history.map((row:any) => {
	row.time = new Date(row.time)
	return row
})

export default updatedStateData;