import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RamChart from '../features/metricHistory/components/RamChart';
import ChainSpeedChart from '../features/metricHistory/components/ChainSpeedChart';
import ChainWeightChart from '../features/metricHistory/components/ChainWeightChart';
import DifficultyChart from '../features/metricHistory/components/DIfficultyChart';
import TransactionCountHistoryChart from '../features/metricHistory/components/TransactionCountHistoryChart';
import NetworkChart from '../features/minimaNetwork/NetworkChart';
import NetworkDataGrid from './../features/minimaNetwork/NetworkDataGrid'
import {theme, themeStyles} from './../styles';

function DashboardMainPage() {
    const classes = themeStyles();

    return (
        <>
            <Grid container spacing={3}>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <NetworkChart></NetworkChart>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Paper>
                        <NetworkDataGrid></NetworkDataGrid>
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}

export default DashboardMainPage;

