import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: 'inherit',
    paddingTop: '15px',
    paddingRight: '15px',
    boxShadow: 'none',
  },
  container: {
    marginLeft: '315px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
  heading: {
    alignItems: 'center',
    paddingLeft: '15px',
  },
  tableHeading: {
    fontWeight: '700',
    color: '#3f51b5',
  },
}));

const AccountDetails = (props) => {
  console.log('initial render');
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get('http://localhost:4000/getAccountDetails')
      .then((response) => {
        const { accountDetails } = response.data;
        const accountData = accountDetails.find(
          (x) => x['account_type'] === 'Savings'
        );
        setRows(accountDetails);
        props.updateBalance(accountData.balance);
      })
      .catch((error) => {
        console.log('Unable to fetch account details.');
      });
  }, []);

  return (
    <>
      <Paper className={classes.paper}>
        <Box className={classes.container}>
          <Box className={classes.heading}>
            <Box pt={1} pb={1}>
              <Typography variant="h5">Account Summary</Typography>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeading}>
                  Account Number
                </TableCell>
                <TableCell className={classes.tableHeading}>
                  Account Type
                </TableCell>
                <TableCell className={classes.tableHeading}>
                  Available Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.account_number}
                    </TableCell>
                    <TableCell>{row.account_type}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </>
  );
};

export default AccountDetails;
