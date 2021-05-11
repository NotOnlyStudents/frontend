import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

interface Props extends CustomSnackbarProps {
  productName: string
}

export const addToCartErrorId = 'add_to_cart_error';

function SnackbarAddToCartError({
  productName,
  open,
  handleClose,
}: Props) {
  return (
    <EMLSnackbar
      id={addToCartErrorId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      { `Something went wrong adding ${productName} to cart`}
    </EMLSnackbar>
  );
}

export default SnackbarAddToCartError;
