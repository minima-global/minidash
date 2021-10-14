import { useRef, useEffect } from 'react'
import {theme, themeStyles} from '../../styles';

import * as networkDetails from './network_details.json'
import * as miserables from './miserables.json'

import { Chart, registerables } from 'chart.js';
import { ForceDirectedGraphController } from 'chartjs-chart-graph';


// TODO: no labels
// Use https://github.com/crubier/react-graph-vis


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


        /// address == source
        /// outlinks == target

        const minimaNetworkNodes = networkDetails.response.nodes
        let minimaNetworkEdges: any[] = []
        minimaNetworkNodes
            .forEach(node => {
                const nodeEdges = node.out_links.map(outLink => {
                    return {
                        source: node.address,
                        target: outLink
                    }
                })
                minimaNetworkEdges = minimaNetworkEdges.concat(nodeEdges)
            })
        const minimaNetworkNodeLabels = minimaNetworkNodes.map(n => n.address)
        
        console.log('minimaNetworkNodes', minimaNetworkNodes)
        console.log('minimaNetworkEdges', minimaNetworkEdges)
        console.log('minimaNetworkNodeLabels', minimaNetworkNodeLabels)

        Chart.register(ForceDirectedGraphController, ...registerables);
        new Chart(context, {
            type: 'forceDirectedGraph',
            data: {
              labels: minimaNetworkNodeLabels,
              datasets: [
                {
                  pointBackgroundColor: 'steelblue',
                  pointRadius: 5,
                  data: minimaNetworkNodes,
                  edges: minimaNetworkEdges,
                },
              ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        })
    }, [])


    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>P2P-Network</h2>
            </div>
            <div className={classes.networkChartContainer}>
                <canvas ref={canvasRef}/>
            </div>
        </div>
    );
}

export default NetworkChart