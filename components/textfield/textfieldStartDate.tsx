import React from 'react';
import {
  Grid,
  IconButton,
  makeStyles, TextField,
} from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface Props {
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
    if (event !== null) {
      console.log(event.target.value);
      setValue(event.target.value);
      handleChangeStart(new Date(event.target.value).toISOString());
    } else {
      setValue('');
      handleChangeStart('');
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignItems="flex-end">
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
    </>
  );
}

export default TextfieldStartDate;
