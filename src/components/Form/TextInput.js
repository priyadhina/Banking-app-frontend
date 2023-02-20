import React from 'react';
import { TextField } from '@material-ui/core';

const fieldNames = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone Number',
  type: 'Customer Type',
  address: 'Address',
};

const TextInput = (props) => {
  const { fk, name } = props;
  return (
    <TextField
      size="small"
      label={fieldNames[name]}
      name={name}
      variant="outlined"
      onChange={fk.handleChange}
      value={fk.values[name]}
      fullWidth
      error={Boolean(fk.errors[name])}
      helperText={fk.errors[name]}
    />
  );
};

export default TextInput;
