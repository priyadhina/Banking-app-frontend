import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';

function UpdateLimitDialog({
  updateLimit,
  limit,
  title = 'Update Withdrawal limit',
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    setValue(limit);
  }, [limit]);

  const handleUpdate = () => {
    updateLimit(inputRef.current.value);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        onClick={() => setOpen(true)}
        color="primary"
        variant="outlined"
      >
        Update
      </Button>
      <Dialog open={open} onClose={handleCancel} fullWidth>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <label>Enter Withdrawal limit: </label>
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateLimitDialog;
