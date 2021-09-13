import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from './../../../app/hooks'
// import { selectRamHistory, select1H } from './../metricHistorySlice'
import {theme, themeStyles} from './../../../styles';

import { selectRamHistory } from '../metricHistory.selector'


const RamChart = () => {
    const classes = themeStyles();
    const ramHistory = useAppSelector(selectRamHistory)

    // chart.js config
    const data: any = {
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            backgroundColor: '#99d3ff',
            borderColor: '#0091ff',
            options: {
                legend: {
                    display: false
                }, 
            }        
        }]
    };

    const options = {
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'MB'
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


    // add our ram data to chart.js config
    const ramData: any = ramHistory.map((row: any) => {
        return { x: row.x, y: row.y }
    })
    const ramDataLabels: any = ramHistory.map((row: any) => row.label)
    data.datasets[0].data = ramData
    data.labels = ramDataLabels


    return (
        <div className={classes.dashboardComponentContainer}>
            <div>
                <h2>RAM</h2>
            </div>
            <div className={classes.dashboardChartContainer}>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default RamChart