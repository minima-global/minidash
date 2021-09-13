import { render, fireEvent, screen } from './../../../../app/test-util'
import RamChart from './../RamChart'
import mockState from './state.mock'
import { minimaGetMetrics } from './../../metricHistorySlice'
// import { useAppDispatch } from './../../../../app/hooks'
// import { store } from './../../../../app/store'


test('fetches & receives a user after clicking the fetch user button', async () => {
    // const dispatch = useAppDispatch()
    // store.dispatch(minimaGetMetrics())

    render(<RamChart/>, {preloadedState:mockState})
    // render(<RamChart/>)

    // should show no user initially, and not be fetching a user
    expect(screen.getByText(/no user/i)).toBeInTheDocument()
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

    // after clicking the 'Fetch user' button, it should now show that it is fetching the user
    fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
    expect(screen.getByText(/no user/i)).toBeInTheDocument()

    // after some time, the user should be received
    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
    expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
})