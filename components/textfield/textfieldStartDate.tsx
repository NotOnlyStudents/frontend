import React from 'react';
import {
  InputAdornment, makeStyles, Snackbar, TextField,
} from '@material-ui/core';

interface Props {
  // selectedStartDate: Date
  // selectedEndDate: Date
  // handleChangeStart: (start: Date) => void;
  selectedStartDate,
  selectedEndDate,
  handleChangeStart: (start: Date) => void;
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
  const [value, setValue] = React.useState<Date>(selectedStartDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((new Date(event.target.value).getTime()));
    console.log((new Date(selectedEndDate)));
    if (+event.target.value<= selectedEndDate) {
      handleChangeStart(new Date(event.target.value));
    }
  };

  React.useEffect(() => {
    setValue(selectedStartDate);
  }, [selectedStartDate]);

  return (
    <>
      <TextField
        id="datetime-local"
        label="Search start date"
        type="datetime-local"
        value={value}
        variant="outlined"
        className={classes.textField}
        helperText="Start date must be previous than end date"
        placeholder="Start date"
        InputLabelProps={{
          shrink: true,
        }}
        //onChange={handleChange}
      />
    </>
  );
}

export default TextfieldStartDate;
