import React, { useDebugValue } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/products/category';
import { getCategories } from 'services/productService';

interface Props {
  options?: Category[]
  handleChangeCategories: (categories: Category[]) => void;
}

const options: Category[] = [{name: 'home'}, {name: 'bricolage'}];

export default function AsynchronousAutocomplete({ options, handleChangeCategories }: Props) {

  const [categoriesOptions, setCategoriesOptions] = React.useState([]);

  
  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, value) => { handleChangeCategories(value as Category[]); console.log(value)} }
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categories" variant="standard" />}
    />
  );
}

AsynchronousAutocomplete.getServerSideProps = async () => {
  const options: Category[] = await getCategories();
  return options;
}