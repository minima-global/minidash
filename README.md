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
```npm run build``` creates the minidash.minidapp file

Install this into Minima store.

## Build Tools
Uses Create-React-App


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

## Data

Data is collected in the Minima back end (see service.js) on the ```newblock``` event

## Tests

```npm run test```


## Next Tasks

- Back end (service.js) stores the chart data in a table. Rows get deleted after the table gets to 4320 rows. This is because newblock events are roughly 20s apart and 4320 rows will be about 1days worth of data. The UI always requests all the rows and displays them in the chart. So charts will mostly have about 4320 data points which is probaly too much. One possible solution is to summerise this and display less points
- The chart components use vh (viewport heights), so they will fit on one page in when full screen without scroll bars. The header uses pixels. This mixture of units may mean a scrollbar will could if the browser window is resized.
- Redux action name strings are not consistent. Need to make them all the same
- 

## Notes

need this property in package.json ```"homepage": "./",```

dev tools ```"devDependencies": {
    "redux-devtools-extension": "^2.13.9"
  }```

import minima ```"minima": "file:minima-0.96.20.tgz",```
