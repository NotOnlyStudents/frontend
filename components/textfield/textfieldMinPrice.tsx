import React from 'react';
import {
  InputAdornment, Snackbar, TextField,
} from '@material-ui/core';
// import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';

interface Props {
  selectedMinPrice: number
  selectedMaxPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

function TextfieldMinPrice({
  selectedMinPrice, handleChangeMinPrice,
  selectedMaxPrice,
}:Props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value > selectedMaxPrice) {
      setError(true);
    } else {
      setError(false);
      handleChangeMinPrice(+event.target.value);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('0');
    handleChangeMinPrice(0);
  };

  React.useEffect(() => {
    setValue(selectedMinPrice.toString());
  }, [selectedMinPrice]);

  return (
    <>
      <TextField
        id="min price"
        value={value}
        onChange={handleChange}
        type="number"
        error={value < '0' || error || selectedMinPrice > selectedMaxPrice}
        helperText={value < '0' && 'Value must be positive'}
        placeholder="min price"
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
  // <EMLSnackbar open={
  //  error || selectedMinPrice > selectedMaxPrice
  // } severity="error" autoDuration={3000} />
}

export default TextfieldMinPrice;
