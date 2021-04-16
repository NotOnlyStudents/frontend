import React from 'react';
import {
  FormControl, Input, InputAdornment, InputLabel,
} from '@material-ui/core';

interface Props {
  selectedMinPrice: number
  handleChangeMinPrice: (minPrice: number) => void;
}

function TextfieldMinPrice(
  {
    selectedMinPrice, handleChangeMinPrice,
  }:Props,
) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
    handleChangeMinPrice(+event.target.value);
  };

  React.useEffect(() => {
    if (selectedMinPrice !== undefined) {
      setValue(selectedMinPrice);
    }
  });

  return (
    <FormControl>
      <InputLabel htmlFor="min price">Min Price</InputLabel>
      <Input
        id="min price"
        value={value}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
        type="number"
      />
    </FormControl>
  );
}

export default TextfieldMinPrice;
