import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Divider,
  Modal,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { updateBalance, getComputedDepositValue } from '../helpers/Utils';

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
  label: {
    paddingLeft: '10px',
  },
  gridItem: {
    display: 'inline',
    padding: '10px',
    position: 'relative',
  },
  depositType: {
    paddingTop: '15px',
  },
  radioGroup: {
    paddingLeft: '15px',
  },
  formGroup: {
    padding: '10px',
  },
  radioBtn: {
    color: '#3f51b5',
  },
  textInput: {
    padding: '10px',
  },
  textBox: {
    marginLeft: '15px',
  },
}));

const FundTransferPage = (props) => {
  const classes = useStyles();
  const [type, setType] = useState();
  const [load, setLoad] = useState(false);
  const [depositType, setDepositType] = useState();
  const [dialog, showDialog] = useState({ show: false, message: '' });
  const [isDisabled, setDisabled] = useState(true);

  const handleRadioChange = (e, cb, type) => {
    cb(e.target.value);
    if (!type && e.target.value !== 'withdraw') setLoad(true);
    else setLoad(false);
  };

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        <Box className={classes.heading}>
          <Box pt={1} pb={1}>
            <Typography variant="h5">Funds Transfer</Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container className={classes.gridItem}>
          <Formik
            initialValues={{
              type: '',
              depositType: '',
              withdrawVal: 0,
              depositValue: 0,
              cheque_number: '',
              bank_name: '',
              cheque_amt: 0,
              remarks: '',
              denominationValues: {
                50: 0,
                100: 0,
                500: 0,
                1000: 0,
              },
              denominationValue1: false,
              denominationValue2: false,
              denominationValue3: false,
              denominationValue4: false,
            }}
            onSubmit={(values) => {
              if (values.depositType === 'cash')
                values.depositValue = getComputedDepositValue(
                  values.denominationValues
                );
              if (
                values.type === 'withdraw' &&
                Number(values.withdrawVal) > Number(props.limit)
              )
                showDialog({
                  show: true,
                  message: 'Amount exceeds withdrawal limit.Please try again.',
                });
              else if (Number(props.balance) < Number(values.withdrawVal))
                showDialog({
                  show: true,
                  message: "You don't have sufficient balance.",
                });
              else if (
                values.depositType === 'cash' &&
                Object.values(values.denominationValues).every(
                  (val) => val == 0
                )
              )
                showDialog({
                  show: true,
                  message: 'Enter denomination values and try again.',
                });
              else if (
                values.type === 'deposit' &&
                values.depositType === 'cheque' &&
                values.cheque_amt == 0
              )
                showDialog({
                  show: true,
                  message: 'Enter amount to be deposited and try again.',
                });
              else if (values.type === 'withdraw' && values.withdrawVal == 0)
                showDialog({
                  show: true,
                  message: 'Enter amount to be withdrawn and try again.',
                });
              else if (values.type === 'deposit' && values.depositType === '')
                showDialog({
                  show: true,
                  message: 'Choose deposit type and proceed.',
                });
              else
                Promise.resolve(updateBalance({ values })).then(() => {
                  showDialog({
                    show: true,
                    message: `${
                      values.type === 'deposit'
                        ? 'Amount credited to account successfully.'
                        : 'Rs.' +
                          values.withdrawVal +
                          ' debited from account successfully.'
                    }`,
                  });
                });
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Grid item>
                  <Typography className={classes.label}>
                    Choose Transfer Type:{' '}
                  </Typography>
                  <RadioGroup
                    value={values.type}
                    className={classes.radioGroup}
                    row
                    onChange={handleChange}
                  >
                    {/* <CustomFormComponent values={["deposit","withdraw"]} type="radio" setType={setType} /> */}
                    <FormControlLabel
                      value="deposit"
                      control={
                        <Radio
                          name="type"
                          color="primary"
                          onChange={(e) => handleRadioChange(e, setType)}
                        />
                      }
                      label="Deposit"
                    />
                    <FormControlLabel
                      value="withdraw"
                      control={
                        <Radio
                          name="type"
                          color="primary"
                          onChange={(e) => handleRadioChange(e, setType)}
                        />
                      }
                      label="Withdraw"
                    />
                  </RadioGroup>
                </Grid>
                {load && type === 'deposit' && (
                  <Grid item className={classes.depositType}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}
                    >
                      <Typography className={classes.label}>
                        Choose Deposit Type:{' '}
                      </Typography>
                      <RadioGroup
                        value={values.depositType}
                        className={classes.radioGroup}
                        row
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="cash"
                          control={
                            <Radio
                              name="depositType"
                              color="primary"
                              onChange={(e) =>
                                handleRadioChange(e, setDepositType)
                              }
                            />
                          }
                          label="By Cash"
                        />
                        <FormControlLabel
                          value="cheque"
                          control={
                            <Radio
                              name="depositType"
                              color="primary"
                              onChange={(e) =>
                                handleRadioChange(e, setDepositType)
                              }
                            />
                          }
                          label="By Cheque"
                        />
                      </RadioGroup>
                    </Box>
                  </Grid>
                )}
                {load && depositType === 'cash' && (
                  <Grid item className={classes.depositType}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', ml: 6 }}
                    >
                      <Typography className={classes.label}>
                        Choose Denominations:{' '}
                      </Typography>
                      <FormControl
                        required
                        className={classes.radioGroup}
                        size="small"
                        variant="outlined"
                        onChange={handleChange}
                      >
                        <FormGroup className={classes.formGroup} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="denominationValue1"
                              />
                            }
                            label="50"
                          />
                          {values.denominationValue1 && (
                            <TextField
                              size="small"
                              className={classes.textBox}
                              label="No_of_50s"
                              name="denominationValues.50"
                            />
                          )}
                        </FormGroup>
                        <FormGroup className={classes.formGroup} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="denominationValue2"
                              />
                            }
                            label="100"
                          />
                          {values.denominationValue2 && (
                            <TextField
                              className={classes.textBox}
                              label="No_of_100s"
                              name="denominationValues.100"
                            />
                          )}
                        </FormGroup>
                        <FormGroup className={classes.formGroup} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="denominationValue3"
                              />
                            }
                            label="500"
                          />
                          {values.denominationValue3 && (
                            <TextField
                              className={classes.textBox}
                              label="No_of_500s"
                              name="denominationValues.500"
                            />
                          )}
                        </FormGroup>
                        <FormGroup className={classes.formGroup} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="denominationValue4"
                              />
                            }
                            label="1000"
                          />
                          {values.denominationValue4 && (
                            <TextField
                              className={classes.textBox}
                              label="No_of_1000s"
                              name="denominationValues.1000"
                            />
                          )}
                        </FormGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                )}
                {load && depositType === 'cheque' && (
                  <Grid item>
                    <Box pt={1} pb={1}>
                      <div role="group">
                        <div className={classes.textInput}>
                          <label>Enter Cheque number: &nbsp;</label>
                          <input
                            type="text"
                            name="cheque_number"
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.textInput}>
                          <label>Enter Issuer bank: &nbsp;</label>
                          <input
                            type="text"
                            name="issuer_bank"
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.textInput}>
                          <label>Enter Amount to be deposited: &nbsp;</label>
                          <input
                            type="text"
                            name="cheque_amt"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </Box>
                  </Grid>
                )}
                {type === 'withdraw' && (
                  <Grid item>
                    <Box pt={1} pb={1}>
                      <div className={classes.textInput}>
                        <label>Enter withdrawal amount: &nbsp;</label>
                        <input
                          type="text"
                          name="withdrawVal"
                          onChange={handleChange}
                        />
                      </div>
                      <div className={classes.textInput}>
                        <label>Enter Remarks: &nbsp;</label>
                        <input
                          type="text"
                          name="remarks"
                          onChange={handleChange}
                        />
                      </div>
                    </Box>
                  </Grid>
                )}
                <Grid className={classes.textInput}>
                  <Button color="primary" variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        {dialog.show && (
          <Modal open={dialog.show} onClose={() => showDialog({ show: false })}>
            <Box
              sx={{
                width: '50%',
                margin: '0 auto',
                background: 'white',
                padding: '15px',
                marginTop: '50vh',
              }}
              component="h2"
            >
              <Typography>{dialog.message}</Typography>
            </Box>
          </Modal>
        )}
      </Box>
    </Paper>
  );
};

export default FundTransferPage;

const CustomFormComponent = (props) => {};
