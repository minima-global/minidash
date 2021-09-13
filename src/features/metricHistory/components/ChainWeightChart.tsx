import { Line } from 'react-chartjs-2';
import { useAppSelector } from './../../../app/hooks'
import { selectChainWeightHistory } from './../metricHistory.selector'
import {theme, themeStyles} from './../../../styles';


const ChainWeightChart = () => {
    const classes = themeStyles();
    const chainWeightHistory = useAppSelector(selectChainWeightHistory)

    // chart.js config
    const data: any = {
        labels: [],
        datasets: [{
            label: 'Chain Weight',
            data: [],
            fill: false,
            backgroundColor: '#99d3ff',
            borderColor: '#0091ff',
        }]
    };

    const options = {
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Kg'
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }, 
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    const chainWeightData: any = chainWeightHistory.map((row: any) => {
        return { x: row.x, y: row.y }
    })
    const chainWeightDataLabels: any = chainWeightHistory.map((row: any) => row.label)

    data.datasets[0].data = chainWeightData
    data.labels = chainWeightDataLabels



    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>Chain Weight</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default ChainWeightChart