import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

interface Props extends CustomSnackbarProps {
  productName: string
}

export const addToCartSuccessId = 'add_to_cart_success';

function SnackbarChangeEvidenceError({
  productName,
  open,
  handleClose,
}: Props) {
  return (
    <EMLSnackbar
      id={addToCartSuccessId}
      open={open}
      severity="success"
      handleClose={handleClose}
    >
      { `${productName} added to cart` }
    </EMLSnackbar>
  );
}

export default SnackbarChangeEvidenceError;
