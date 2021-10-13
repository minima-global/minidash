import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RamChart from '../features/metricHistory/components/RamChart';
import ChainSpeedChart from '../features/metricHistory/components/ChainSpeedChart';
import ChainWeightChart from '../features/metricHistory/components/ChainWeightChart';
import DifficultyChart from '../features/metricHistory/components/DIfficultyChart';
import TransactionCountHistoryChart from '../features/metricHistory/components/TransactionCountHistoryChart';
import NetworkChart from '../features/metricHistory/components/NetworkChart';
import {theme, themeStyles} from './../styles';

function DashboardMainPage() {
    const classes = themeStyles();

    return (
        <>
            <Grid container spacing={3}>

                <NetworkChart></NetworkChart>

                {/* <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <RamChart></RamChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <ChainSpeedChart></ChainSpeedChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <ChainWeightChart></ChainWeightChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <DifficultyChart></DifficultyChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <TransactionCountHistoryChart></TransactionCountHistoryChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <NetworkChart></NetworkChart>
                    </Paper>
                </Grid> */}

            </Grid>
        </>
    );
}

export default DashboardMainPage;

