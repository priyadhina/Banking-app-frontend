import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  Button,
  makeStyles,
  Typography,
  Box,
  Card,
  Grid,
  CardHeader,
  Divider,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Modal,
} from '@material-ui/core';
import FormContent from './Form/FormContent.js';
import UpdateLimitDialog from './Form/UpdateLimitDialog.js';

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
  action: {
    marginTop: '0px',
    marginRight: '0px',
  },
  tableCell: {
    verticalAlign: 'top',
    borderBottom: 'none',
    padding: '5px',
  },
}));

const HomePage = (props) => {
  const [user, setUser] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get('http://localhost:4000/getUserDetails')
      .then((response) => {
        const userData = response.data.userData;
        setUser(userData);
        props.updateWithdrawalLimit(userData.limit);
      })
      .catch((error) => {
        console.log('Something went wrong. Please try again later.');
      });
  }, []);

  const updateLimit = (limit) => {
    axios
      .post('http://localhost:4000/updateLimit', { limit })
      .then((response) => {
        const userData = response.data.userData;
        setUser(userData);
        props.updateWithdrawalLimit(userData.limit);
      });
  };

  const customerDetails = [
    {
      label: 'Customer ID',
      text: user?.id,
    },
    {
      label: 'Customer Name',
      text: user?.name,
    },
    {
      label: 'Customer Email',
      text: user?.email,
    },
    {
      label: 'Customer Type',
      text: user?.type,
    },
    {
      label: 'Customer Phone',
      text: user?.phone,
    },
    {
      label: 'Customer Address',
      text: user?.address,
    },
  ];

  return (
    <>
      <Paper className={classes.paper}>
        <Box className={classes.container}>
          <Card>
            <CardHeader
              title="Customer Details"
              classes={{ action: classes.action }}
              className={classes.edit}
              action={
                <>
                  <Button
                    className={classes.edit}
                    color="primary"
                    variant="outlined"
                    onClick={() => setShowDialog(true)}
                    size="small"
                  >
                    Edit
                  </Button>
                </>
              }
            />
            <Divider />
            <CardContent>
              <Grid container>
                <Grid item md={6}>
                  <Table style={{ tableLayout: 'auto' }}>
                    <TableBody>
                      {customerDetails.map(({ label, text }, index) => (
                        <TableRow key={index}>
                          <TableCell size="small" className={classes.tableCell}>
                            <Typography>{label}</Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>:</TableCell>
                          <TableCell size="small" className={classes.tableCell}>
                            <Typography>{text}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell size="small" className={classes.tableCell}>
                          <Typography>Withdrawal Limit</Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>:</TableCell>
                        <TableCell size="small" className={classes.tableCell}>
                          <Typography>
                            {props.limit}
                            &nbsp;&nbsp;
                            <UpdateLimitDialog
                              limit={props.limit}
                              updateLimit={updateLimit}
                            />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            {/* <UpdateLimitDialog
                    limit={props.limit}
                    updateLimit={updateLimit}
                /> */}
          </Card>
        </Box>
        {showDialog && (
          <Modal
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            open={showDialog}
            onClose={() => setShowDialog(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ width: '50%', margin: '0 auto', background: 'white' }}>
              <FormContent
                setUser={setUser}
                setShowDialog={setShowDialog}
                user={user}
              />
            </Box>
          </Modal>
        )}
      </Paper>
    </>
  );
};

export default HomePage;
