import { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './app/Layout';
import { useAppDispatch } from './app/hooks';
import { minimaInit } from './minima.init'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(minimaInit())
	},[dispatch])


	return (
		<>
			<CssBaseline/>
			<Layout/>
		</>
	);
}

export default App;
