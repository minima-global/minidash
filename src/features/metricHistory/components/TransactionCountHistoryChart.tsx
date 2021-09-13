import { Bar } from 'react-chartjs-2';
import { useAppSelector } from './../../../app/hooks'
import { selectTransactionCountHistory } from './../metricHistory.selector'
import {theme, themeStyles} from './../../../styles';


const TransactionCountHistoryChart = () => {
    const classes = themeStyles();
    const transactionCountHistory = useAppSelector(selectTransactionCountHistory)

    // chart.js config
    const data: any = {
        labels: [],
        datasets: [{
            label: 'Transaction Count',
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
                    text: 'Number of Transactions'
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Block Number'
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

    const transactionCountData: any = transactionCountHistory.map((row: any) => {
        return row.data
    })
    const transactionCountDataLabels: any = transactionCountHistory.map((row: any) => row.label)

    data.datasets[0].data = transactionCountData
    data.labels = transactionCountDataLabels



    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>Transactions Per Block</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <Bar data={data} options={options}/>
            </div>
        </div>
    );
}

export default TransactionCountHistoryChart