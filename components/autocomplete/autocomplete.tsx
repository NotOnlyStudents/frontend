import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/products/category';

interface Props {
  selectedCategories: Category[]
  options: Category[]
  handleChangeCategories: (categories: Category[]) => void;
}

function AsynchronousAutocomplete(
  { selectedCategories, options, handleChangeCategories }: Props,
) {
  console.log(selectedCategories);
  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, value) => {
        handleChangeCategories(value as Category[]);
      }}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      defaultValue={selectedCategories}
      renderInput={(params) => <TextField {...params} label="Categories" variant="standard" />}
    />
  );
}

export default AsynchronousAutocomplete;
