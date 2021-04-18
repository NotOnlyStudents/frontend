import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';
// import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';

interface Props {
  selectedMinPrice: number
  selectedMaxPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em',
  },
});

function TextfieldMinPrice({
  selectedMinPrice, handleChangeMinPrice,
  selectedMaxPrice,
}:Props) {
  const [value, setValue] = React.useState<number>();
  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > selectedMaxPrice) {
      setError(true);
    } else {
      setError(false);
      handleChangeMinPrice(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedMinPrice);
  }, [selectedMinPrice]);

  return (
    <>
      <TextField
        id="min price"
        label="min price"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={handleChange}
        type="number"
        error={value < 0 || error || selectedMinPrice > selectedMaxPrice}
        helperText={value < 0 && 'Value must be positive'}
        placeholder="min price"
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
