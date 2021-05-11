import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productDeleteError = 'product_delete_error';

interface Props extends CustomSnackbarProps {
  productName: string
}

function SnackbarDeleteProductError({
  productName, open, handleClose,
}: Props) {
  return (
    <EMLSnackbar
      id={productDeleteError}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      {`An error occured deleting ${productName}`}
    </EMLSnackbar>
  );
}

export default SnackbarDeleteProductError;
