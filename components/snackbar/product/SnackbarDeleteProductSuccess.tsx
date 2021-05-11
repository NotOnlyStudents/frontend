import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const productDeleteSuccess = 'product_delete_success';

interface Props extends CustomSnackbarProps {
  productName: string
}

function SnackbarDeleteProductSuccess({
  productName, open, handleClose,
}: Props) {
  return (
    <EMLSnackbar
      id={productDeleteSuccess}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      {`${productName} deleted`}
    </EMLSnackbar>
  );
}

export default SnackbarDeleteProductSuccess;
