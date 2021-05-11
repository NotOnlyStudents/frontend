import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';
// import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';
import SnackbarMaxPriceLowerMinPrice, { maxPriceLowerMinPrice } from 'components/snackbar/filters/SnackbarMaxPriceLowerMinPrice';

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
  const [value, setValue] = React.useState<number>(selectedMaxPrice);
  const [alert, setAlert] = React.useState({
    [maxPriceLowerMinPrice]: false,
  });
  const classes = useStyles();

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const closeAlert = (id: string) => {
    changeAlert(id, false);
  };

  const openAlert = (id: string) => {
    changeAlert(id, true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value < selectedMinPrice) {
      openAlert(maxPriceLowerMinPrice);
    } else {
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
        helperText="Value must be greater than min price"
        placeholder="Max price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      />
      <SnackbarMaxPriceLowerMinPrice
        open={alert[maxPriceLowerMinPrice]}
        handleClose={closeAlert}
      />
    </>
  );
  // <EMLSnackbar id="error_price" open={
  //  error || selectedMinPrice > selectedMaxPrice
  // } severity="error" duration={3000}>
  //   Min price cannot be greater than max price
  // </EMLSnackbar>
}

export default TextfieldMaxPrice;
