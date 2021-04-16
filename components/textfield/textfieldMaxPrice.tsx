import React from 'react';
import {
  FormControl, Input, InputAdornment, InputLabel,
} from '@material-ui/core';

interface Props {
  selectedMaxPrice: number
  handleChangeMaxPrice: (maxPrice: number) => void;
}

function TextfieldMaxPrice(
  {
    selectedMaxPrice, handleChangeMaxPrice,
  }:Props,
) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
    handleChangeMaxPrice(+event.target.value);
  };

  React.useEffect(() => {
    if (selectedMaxPrice !== undefined) {
      setValue(selectedMaxPrice);
    }
  });

  return (
    <FormControl>
      <InputLabel htmlFor="max price">Max Price</InputLabel>
      <Input
        id="max price"
        value={value}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
        type="number"
      />
    </FormControl>
  );
}

export default TextfieldMaxPrice;
