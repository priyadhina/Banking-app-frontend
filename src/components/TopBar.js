import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { removeUserSession } from '../helpers/Utils';

const useStyles = makeStyles(() => ({
  header: {
    position: 'sticky',
    zIndex: 9999,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoutBtn: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  drawer: {
    width: '300px',
    backgroundColor: '#ddd',
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    fontSize: '18px',
    '&:hover': {
      fontSize: '20px',
    },
  },
  drawerList: {
    backgroundColor: '#ddd',
  },
  drawerItems: {
    textAlign: 'center',
  },
}));

const linkItems = [
  {
    link: 'home',
    name: 'Home',
  },
  {
    link: 'account_details',
    name: 'Account Summary',
  },
  {
    link: 'fund_transfer',
    name: 'Fund Transfer',
  },
  {
    link: 'transactions',
    name: 'Transaction History',
  },
];

export const DrawerComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        anchor="left"
        PaperProps={{ className: classes.drawer }}
        open={true}
        variant="persistent"
      >
        <Toolbar />
        <List className={classes.drawerList}>
          {linkItems.map((value, index) => {
            return (
              <ListItem key={index} className={classes.drawerItems}>
                <ListItemText>
                  <Link className={classes.link} to={`/${value.link}`}>
                    {value.name}
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

const TopBar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <CssBaseline />
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">Customer Banking App</Typography>
          <Button aria-label="logout" onClick={() => removeUserSession()}>
            <Link className={classes.logoutBtn} to="/">
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
