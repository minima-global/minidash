import { useRef, useEffect } from 'react'
import {theme, themeStyles} from '../../../styles';

import * as networkDetails from './tests/network_details.json'
import * as miserables from './tests/miserables.json'

import { Chart, LinearScale, Point } from 'chart.js';
import { ForceDirectedGraphController, EdgeLine, DendogramController } from 'chartjs-chart-graph';


// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const NetworkChart = () => {
    const classes = themeStyles();

    const canvasRef = useRef(null)
  
    useEffect(() => {
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#800080'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        Chart.register(ForceDirectedGraphController, DendogramController);
        new Chart(context, {
            type: 'forceDirectedGraph',
            data: {
              labels: miserables.nodes.map((d) => d.id),
              datasets: [
                {
                  pointBackgroundColor: 'steelblue',
                  pointRadius: 5,
                  data: [ // nodes as objects
                    { x: 1, y: 2 }, // x, y will be set by the force directed graph and can be omitted
                    { x: 3, y: 1 },
                    { x: 5, y: 3 }
                  ],
                  edges: [ // edge list where source/target refers to the node index
                    { source: 0, target: 1},
                    { source: 0, target: 2}
                  ]
                },
              ],
            },
        })
    }, [])


    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>Network</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <canvas ref={canvasRef}/>
            </div>
        </div>
    );
}

export default NetworkChart