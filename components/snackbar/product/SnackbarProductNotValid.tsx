import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productNotValidId = 'validation';

function SnackbarProductNotValid({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={productNotValidId}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Some field doesn't satisfy the minimal requirements
    </EMLSnackbar>
  );
}

export default SnackbarProductNotValid;
