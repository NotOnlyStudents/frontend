import React from 'react';
import {
  FormControl, Input, InputAdornment, InputLabel,
} from '@material-ui/core';

interface Props {
  selectedMaxPrice: number
  handleChangeMaxPrice: (maxPrice: number) => void;
}

function TextfieldMaxPrice({
  selectedMaxPrice, handleChangeMaxPrice,
}:Props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeMaxPrice(+event.target.value);
  };

  React.useEffect(() => {
    setValue(selectedMaxPrice.toString());
  }, [selectedMaxPrice]);

  return (
    <FormControl>
      <InputLabel htmlFor="max price">Max Price</InputLabel>
      <Input
        id="max price"
        value={value}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
        type="number"
        placeholder="max price"
      />
    </FormControl>
  );
}

export default TextfieldMaxPrice;
