import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedMinPrice: number
  selectedMaxPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
});

function TextfieldMinPrice({
  selectedMinPrice, handleChangeMinPrice,
  selectedMaxPrice,
}:Props) {
  const [value, setValue] = React.useState<number>(selectedMinPrice);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= selectedMaxPrice) {
      handleChangeMinPrice(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedMinPrice);
  }, [selectedMinPrice]);

  return (
    <>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        value={value}
        variant="outlined"
        className={classes.textField}
        helperText="Start date must be previous than end date"
        placeholder="Start date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </>
  );
}

export default TextfieldMinPrice;
