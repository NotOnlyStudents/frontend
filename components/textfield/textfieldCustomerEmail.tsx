import React from 'react';
import {
  makeStyles, TextField,
} from '@material-ui/core';

interface Props {
  customer: string
  handleChangeCustomer: (customerEmail: string) => void;
}

const useStyles = makeStyles({
  price: {
    padding: '0.5em 0',
    width: '100%',
  },
});

function TextFieldCustomerEmail({
  customer, handleChangeCustomer,
}:Props) {
  const [value, setValue] = React.useState<string>(customer);
  const classes = useStyles();

  const handleKeyEnter = async (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      handleChangeCustomer(value);
    }
  };

  React.useEffect(() => {
    setValue(customer);
  }, [customer]);

  return (
    <>
      <TextField
        id="customerEmail"
        label="customerEmail"
        variant="outlined"
        className={classes.price}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="email"
        helperText="Text must be an email"
        placeholder="Customer email"
        onKeyUp={handleKeyEnter}
      />
    </>
  );
}

export default TextFieldCustomerEmail;
