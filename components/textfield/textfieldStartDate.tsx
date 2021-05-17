import React from 'react';
import {
  makeStyles, TextField,
} from '@material-ui/core';

interface Props {
  // selectedStartDate: Date
  // selectedEndDate: Date
  // handleChangeStart: (start: Date) => void;
  selectedStartDate: string,
  selectedEndDate: string,
  disabled: boolean,
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
  disabled,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<string>(selectedStartDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue(event.target.value);
    handleChangeStart(new Date(event.target.value).toISOString());
  };

  return (
    <>
      <TextField
        id="start Date"
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
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
}

export default TextfieldStartDate;
