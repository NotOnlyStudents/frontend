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
  
  const [value, setValue] = React.useState([]);

  React.useEffect(()=>{
    if(selectedCategories !== undefined)
    {
      setValue(selectedCategories);
    }
  })
  
  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, value: Category[]) => {
        handleChangeCategories(value);
        setValue(value);
        console.log(value);
      }}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      value={value}
      renderInput={(params) => <TextField {...params} label="Categories" variant="standard" />}
    />
  );
}

export default AsynchronousAutocomplete;
