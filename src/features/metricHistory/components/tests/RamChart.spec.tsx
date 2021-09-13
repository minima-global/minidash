import { render, fireEvent, screen } from './../../../../app/test-util'
import RamChart from './../RamChart'
import mockState from './state.mock'
import { minimaGetMetrics } from './../../metricHistorySlice'
// import { useAppDispatch } from './../../../../app/hooks'
// import { store } from './../../../../app/store'


test('renders RAM component', async () => {
    // const dispatch = useAppDispatch()
    // store.dispatch(minimaGetMetrics())

    render(<RamChart/>, {preloadedState:mockState})

    expect(screen.getByText(/RAM/i)).toBeInTheDocument()
})