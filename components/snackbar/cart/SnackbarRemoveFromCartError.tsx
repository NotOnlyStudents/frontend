import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const removedFromCartErrorId = 'removed_from_cart_error';

function SnackbarAddToCartError({
  open,
  handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={removedFromCartErrorId}
      handleClose={handleClose}
      severity="error"
      open={open}
    >
      Something went wrong removing a product from cart
    </EMLSnackbar>
  );
}

export default SnackbarAddToCartError;
