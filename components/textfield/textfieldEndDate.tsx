import React from 'react';
import {
  makeStyles, TextField,
} from '@material-ui/core';

interface Props {
  selectedStartDate: string,
  selectedEndDate: string,
  disabled: boolean,
  handleChangeEnd: (end: string) => void;
}

const useStyles = makeStyles({
  textField: {
    padding: '0.5em 0',
  },
});

function TextfieldEndDate({
  selectedStartDate,
  handleChangeEnd,
  disabled,
  selectedEndDate,
}:Props) {
  const [value, setValue] = React.useState<string>(selectedEndDate);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValue(event.target.value);
    handleChangeEnd(new Date(event.target.value).toISOString());
  };

  return (
    <>
      <TextField
        id="end Date"
        label="Search end date"
        type="datetime-local"
        value={value}
        variant="outlined"
        className={classes.textField}
        helperText="End date must be after than start date"
        placeholder="End date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
}

export default TextfieldEndDate;
