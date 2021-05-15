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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeCustomer(event.target.value);
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
        onChange={handleChange}
        type="email"
        helperText="Text must be an email"
        placeholder="Customer email"
      />
    </>
  );
}

export default TextFieldCustomerEmail;
