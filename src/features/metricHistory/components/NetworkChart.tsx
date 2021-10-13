import { useRef, useEffect } from 'react'
import {theme, themeStyles} from '../../../styles';

import * as networkDetails from './tests/network_details.json'
import * as miserables from './tests/miserables.json'

import { Chart, registerables } from 'chart.js';
import { ForceDirectedGraphController } from 'chartjs-chart-graph';


// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const NetworkChart = () => {
    const classes = themeStyles();

    const canvasRef = useRef(null)
  
    useEffect(() => {
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')

        // source and targets shoud be numbers, which is the index of the nodes in the array
        // {
        //     source: number;
        //     target: number;
        // }

        const linksWithIndexes = miserables.links.map(edge => {
            const sourceIndex = indexInNodeArray(miserables.nodes, edge.source)
            const targetIndex = indexInNodeArray(miserables.nodes, edge.target)

            return {
                source: sourceIndex,
                target: targetIndex,
                value: edge.value
            }
        })

        function indexInNodeArray(nodeArray: any, name:string) {
            return nodeArray.findIndex((node: any) => node.id === name)
        }

        Chart.register(ForceDirectedGraphController, ...registerables);
        new Chart(context, {
            type: 'forceDirectedGraph',
            data: {
              labels: miserables.nodes.map((d) => d.id),
              datasets: [
                {
                  pointBackgroundColor: 'steelblue',
                  pointRadius: 5,
                  data: miserables.nodes,
                  edges: linksWithIndexes,
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