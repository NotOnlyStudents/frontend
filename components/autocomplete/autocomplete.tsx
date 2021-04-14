import React, { useDebugValue } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/products/category';
import { getCategories } from 'services/categoriesService';

interface Props {
  selectedCategories: Category[]
  handleChangeCategories: (categories: Category[]) => void;
}

export default function AsynchronousAutocomplete({selectedCategories, handleChangeCategories }: Props) {
  
  const [options, setOptions] = React.useState([]);

  const getAllCategories = async () => {
    const options = await getCategories();
    setOptions(options)
  }

  React.useEffect(() => {
    getAllCategories();
  }, []);


  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, value) => { handleChangeCategories(value as Category[]); console.log(value)} }
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      defaultValue={selectedCategories}
      renderInput={(params) => <TextField {...params} label="Categories" variant="standard" />}
    />
  );
}
