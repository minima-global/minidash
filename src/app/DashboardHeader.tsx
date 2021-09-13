import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as MinimaIcon } from '../images/minimaIcon.svg';
import { theme, themeStyles} from '../styles';


function DashboardHeader() {
    const classes = themeStyles();

    return (
        <>
            <AppBar className={classes.header}>
                <Grid container>
                    <Grid item container xs={6} alignItems="center">
                        <Typography>Dashboard</Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        alignItems="center"
                        justifyContent="flex-end">
                        <Typography>Powered by Minima</Typography>
                        <MinimaIcon className={classes.minimaIcon} />
                    </Grid>
                </Grid>
            </AppBar>
        </>
    );
}

export default DashboardHeader;

