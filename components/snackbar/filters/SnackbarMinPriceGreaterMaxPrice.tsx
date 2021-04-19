import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const minPriceGreaterMaxPrice = 'min_price_greater_max_price';

function SnackbarMinPriceGreaterMaxPrice({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={minPriceGreaterMaxPrice}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Min price cannot be greater than max price
    </EMLSnackbar>
  );
}

export default SnackbarMinPriceGreaterMaxPrice;
