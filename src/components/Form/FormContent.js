import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import TextInput from './TextInput';

const FormContent = ({ setUser, setShowDialog, user }) => {
  const fk = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      type: user?.type,
      address: user?.address,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      phone: Yup.string()
        .matches(/\+91\d{10}|\+91\s[6|8|9]\d{7}/g, 'Phone number is not valid')
        .required('Required'),
      type: Yup.string().required(),
      address: Yup.string().max(30, 'should not have more than 30 characters.'),
    }),
    onSubmit: (values) => {
      axios
        .post('http://localhost:4000/updateUser', { values })
        .then((response) => {
          setUser(response.data.userData);
          setShowDialog(false);
        });
    },
  });
  return (
    <form noValidate onSubmit={fk.handleSubmit}>
      <DialogTitle>Edit Customer Details</DialogTitle>
      <DialogContent>
        <Box mb={1} p={0}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextInput name="name" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="email" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="phone" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <TextInput name="address" fk={fk} />
            </Grid>
            <Grid item md={6}>
              <FormLabel component="legend">Customer Type</FormLabel>
              <RadioGroup
                aria-label="type"
                name="type"
                row
                value={fk.values.type}
                onChange={fk.handleChange}
              >
                <FormControlLabel
                  value="Retail"
                  control={<Radio color="primary" size="small" />}
                  label="Retail"
                />
                <FormControlLabel
                  value="Corporate"
                  control={<Radio color="primary" size="small" />}
                  label="Corporate"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowDialog(false)}
          color="primary"
          variant="outlined"
        >
          Close
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Edit
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormContent;
