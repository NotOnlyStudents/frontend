import React from 'react';
import {
  Grid,
  makeStyles, TextField,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';

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
    if (event !== null) {
      console.log(event.target.value);
      setValue(event.target.value);
      handleChangeEnd(new Date(event.target.value).toISOString());
    } else {
      setValue('');
      handleChangeEnd('');
    }
  };

  return (
    <>  
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignItems="flex-end">
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
          <IconButton
            edge="end"
            size="small"
            disabled={!value}
            onClick={() => handleChange(null)}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </MuiPickersUtilsProvider>
      {/* <TextField
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
      />*/ }
    </>
  );
}

export default TextfieldEndDate;
