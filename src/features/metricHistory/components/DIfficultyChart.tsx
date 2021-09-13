import { Line } from 'react-chartjs-2';
import { useAppSelector } from './../../../app/hooks'
import { selectDifficultyHistory } from './../metricHistory.selector'
import {theme, themeStyles} from './../../../styles';


const DifficultyChart = () => {
    const classes = themeStyles();
    const difficultyHistory = useAppSelector(selectDifficultyHistory)

    // chart.js config
    const data: any = {
        labels: [],
        datasets: [{
            label: 'Difficulty',
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
                    text: 'TH'
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

    const difficultyData: any = difficultyHistory.map((row: any) => {
        return { x: row.x, y: row.y }
    })
    const difficultyDataLabels: any = difficultyHistory.map((row: any) => row.label)

    data.datasets[0].data = difficultyData
    data.labels = difficultyDataLabels



    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>Difficulty</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default DifficultyChart