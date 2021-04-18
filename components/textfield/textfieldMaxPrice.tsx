import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';
// import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';

interface Props {
  selectedMaxPrice: number
  selectedMinPrice: number
  handleChangeMaxPrice: (maxPrice: number) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em',
  },
});

function TextfieldMaxPrice({
  selectedMaxPrice, handleChangeMaxPrice,
  selectedMinPrice,
}:Props) {
  const [value, setValue] = React.useState<number>();
  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < selectedMinPrice) {
      setError(true);
    } else {
      setError(false);
      handleChangeMaxPrice(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedMaxPrice);
  }, [selectedMaxPrice]);

  return (
    <>
      <TextField
        id="max price"
        label="max price"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={handleChange}
        type="number"
        error={value < 0 || error || selectedMinPrice > selectedMaxPrice}
        helperText={value < 0 && 'Value must be positive'}
        placeholder="max price"
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
