import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedStartDate: string
  selectedEndDate: string
  handleChangeEnd: (end: string) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
});

function TextFieldEndDate({
  selectedStartDate, 
  handleChangeEnd,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<string>(selectedEndDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > selectedEndDate) {
      handleChangeEnd(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedEndDate);
  }, [selectedEndDate]);

  return (
    <>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        value={value}
        variant="outlined"
        className={classes.textField}
        helperText="Fine date must be happen than start date"
        placeholder="Start date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </>
  );
}

export default TextFieldEndDate;