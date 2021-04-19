import React from 'react';
import EMLSnackbar, { CustomSnackbarProps } from '../EMLSnackbar';

export const maxPriceLowerMinPrice = 'max_price_lower_min_price';

function SnackbarMaxPriceLowerMinPrice({
  open, handleClose,
}: CustomSnackbarProps) {
  return (
    <EMLSnackbar
      id={maxPriceLowerMinPrice}
      open={open}
      severity="error"
      handleClose={handleClose}
    >
      Max price cannot be lower than min price
    </EMLSnackbar>
  );
}

export default SnackbarMaxPriceLowerMinPrice;
