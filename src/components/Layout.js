import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';
import HomePage from '../containers/HomePage';
import TopBar, { DrawerComponent } from './TopBar';
const AccountDetails = React.lazy(() => import('../containers/AccountDetails'));
const FundTransferPage = React.lazy(() =>
  import('../containers/FundTransferPage')
);
const TransactionsPage = React.lazy(() =>
  import('../containers/TransactionPage')
);

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'inherit',
    paddingTop: '15px',
    paddingRight: '15px',
    boxShadow: 'none',
  },
}));

const Layout = () => {
  const classes = useStyles();
  const routes = [
    {
      path: '/home',
      component: HomePage,
      exact: true,
    },
    {
      path: '/account_details',
      component: AccountDetails,
      exact: true,
    },
    {
      path: '/fund_transfer',
      component: FundTransferPage,
      exact: true,
    },
    {
      path: '/transactions',
      component: TransactionsPage,
      exact: true,
    },
  ];
  return (
    <>
      <TopBar />
      <Paper className={classes.paper}>
        <Router>
          <DrawerComponent />
          <Suspense fallback={<span></span>}>
            <Switch>
              {routes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  render={(props) => <route.component {...props} />}
                />
              ))}
            </Switch>
          </Suspense>
        </Router>
      </Paper>
    </>
  );
};

export default Layout;
