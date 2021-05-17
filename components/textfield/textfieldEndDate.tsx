import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  selectedStartDate: Date
  selectedEndDate: Date
  handleChangeEnd: (end: Date) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
});

function TextfieldEndDate({
  selectedStartDate, 
  handleChangeEnd,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<Date>(selectedEndDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((new Date(+event.target.value).getTime()) >= (new Date(selectedStartDate)).getTime()) {
      handleChangeEnd(new Date(+event.target.value));
    }
  };

  React.useEffect(() => {
    setValue(selectedEndDate);
  }, [selectedEndDate]);

  return (
    <>
      <TextField
        id="datetime-local"
        label="Search end date"
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

export default TextfieldEndDate;