import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';
// import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import { Alert } from '@material-ui/lab';
import SnackbarMinPriceGreaterMaxPrice, { minPriceGreaterMaxPrice } from 'components/snackbar/filters/SnackbarMinPriceGreaterMaxPrice';

interface Props {
  selectedMinPrice: number
  selectedMaxPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em 0',
  },
});

function TextfieldMinPrice({
  selectedMinPrice, handleChangeMinPrice,
  selectedMaxPrice,
}:Props) {
  const [value, setValue] = React.useState<number>(selectedMinPrice);
  const [alert, setAlert] = React.useState({
    [minPriceGreaterMaxPrice]: false,
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
    if (+event.target.value > selectedMaxPrice) {
      openAlert(minPriceGreaterMaxPrice);
    } else {
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
        helperText="Value must be lower than max price"
        placeholder="Min price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      />
      <SnackbarMinPriceGreaterMaxPrice
        open={alert[minPriceGreaterMaxPrice]}
        handleClose={closeAlert}
      />
    </>
  );
}

export default TextfieldMinPrice;
