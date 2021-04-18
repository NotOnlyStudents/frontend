import React from 'react';
import {
  InputAdornment, Snackbar, TextField,
} from '@material-ui/core';
import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';

interface Props {
  selectedMaxPrice: number
  selectedMinPrice: number
  handleChangeMaxPrice: (maxPrice: number) => void;
}

function TextfieldMaxPrice({
  selectedMaxPrice, handleChangeMaxPrice,
  selectedMinPrice,
}:Props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > selectedMaxPrice) {
      setError(true);
    } else {
      setError(false);
      handleChangeMaxPrice(+event.target.value);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('0');
    handleChangeMaxPrice(0);
  };

  React.useEffect(() => {
    setValue(selectedMaxPrice.toString());
  }, [selectedMaxPrice]);

  return (
    <>
      <TextField
        id="max price"
        value={value}
        onChange={handleChange}
        type="number"
        error={value < '0' || error || selectedMinPrice > selectedMaxPrice}
        helperText={value < '0' && 'Value must be positive'}
        placeholder="max price"
        onFocus={handleFocus}
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      />
      <Snackbar open={error || selectedMinPrice > selectedMaxPrice} autoHideDuration={3000}>
        <Alert severity="error">
          Min price cannot be greater than max price
        </Alert>
      </Snackbar>
    </>
  );
  // <EMLSnackbar id="error_price" open={
  //  error || selectedMinPrice > selectedMaxPrice
  // } severity="error" duration={3000}>
  //   Min price cannot be greater than max price
  // </EMLSnackbar>
}

export default TextfieldMaxPrice;
