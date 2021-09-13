# MiniDash

Dashboard app with charts for recent historical data collected from the Minima blockchain.  

Charts are
- RAM
- Chain Speed
- Chain Weight
- Difficulty
- Transactions per Block

Data is collected and disgarded after about 24h.


![MiniDash](src/images/minidash.png)


## Dependencies
- ```node -v``` v10.19.0
- ```npm -v``` 6.14.4
- React 17.0.2
- Redux 7.2.5


## Run
```npm install```
```npm run build```
Install into Minima store


## UI Components

Uses Material-UI and Chart.js

## Redux
State tree looks like

```
exampleState = {
	counter: counterReducer, // TODO: remove, left as code example
	init: {
		connected: false,
		latestMessage: ''
	},
	metricHistory: {
		history: [{
			chainlength: 5919,
			chainspeed: 0.05,
			chainweight: '4071132619641',
			id: 1,
			ram: 115,
			ramUnits: 'MB',
			time: '2021-09-13T10:07:21.000Z',
			difficulty: 1.2008226091250982e+147,
			blockNumber: 562676,
			transactionCount: 7
		}],
		currentStatus: null
	}
}

```





need this property in package.json ```"homepage": "./",```

dev tools ```"devDependencies": {
    "redux-devtools-extension": "^2.13.9"
  }```

import minima ```"minima": "file:minima-0.96.20.tgz",```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
