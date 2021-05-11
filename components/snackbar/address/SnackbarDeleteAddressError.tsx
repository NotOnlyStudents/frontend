import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressDeleteError = 'address_delete_error';

function SnackbarDeleteAddressError({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressDeleteError}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Something went wrong deleting the address
    </EMLSnackbar>
  );
}

export default SnackbarDeleteAddressError;
