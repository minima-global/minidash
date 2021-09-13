
import Container from '@material-ui/core/Container';

import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import DashboardMainPage from './DashboardMainPage';
import {theme, themeStyles} from './../styles';

function Layout() {
    const classes = themeStyles();


    return (
        <div className={classes.root}>
            <DashboardHeader/>
            <Container  maxWidth='xl' className={classes.dashboardMainContainer}>
                <DashboardMainPage/>
            </Container>
            <DashboardFooter/>
        </div>
    );
}

export default Layout;

