import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedStartDate: string
  selectedEndDate: string
  handleChangeStart: (start: string) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
});

function TextfieldStartDate({
  selectedStartDate, 
  handleChangeStart,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<string>(selectedStartDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= selectedEndDate) {
      handleChangeStart(+event.target.value);
    }
  };

  React.useEffect(() => {
    setValue(selectedStartDate);
  }, [selectedStartDate]);

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

export default TextfieldStartDate;
