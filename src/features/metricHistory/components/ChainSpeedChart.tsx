import { Line } from 'react-chartjs-2';
import { useAppSelector } from './../../../app/hooks'
import { selectChainSpeedHistory } from './../metricHistory.selector'
import {theme, themeStyles} from './../../../styles';


const ChainSpeedChart = () => {
    const classes = themeStyles();
    const chainSpeedHistory = useAppSelector(selectChainSpeedHistory)

    // chart.js config
    const data: any = {
        labels: [],
        datasets: [{
            label: 'Chain Speed',
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
                    text: 'M/s'
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
        animation: {
            duration: 0
        }
    }

    const chainSpeedData: any = chainSpeedHistory.map((row: any) => {
        return { x: row.x, y: row.y }
    })
    const chainSpeedDataLabels: any = chainSpeedHistory.map((row: any) => row.label)

    data.datasets[0].data = chainSpeedData
    data.labels = chainSpeedDataLabels



    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>Chain Speed</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default ChainSpeedChart