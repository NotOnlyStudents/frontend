import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const addressDeleteSuccess = 'address_delete_success';

function SnackbarDeleteAddressSuccess({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={addressDeleteSuccess}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      Address successfully deleted
    </EMLSnackbar>
  );
}

export default SnackbarDeleteAddressSuccess;
