import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service/CategoryService';

interface Props {
  selectedCategories: Category[]
  handleChangeCategories: (categories: Category[]) => void;
}

function AutocompleteCategories(
  { selectedCategories, handleChangeCategories }: Props,
) {
  const [value, setValue] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  const getallCategories = async () => {
    let categoriesOptions = [];

    try {
      categoriesOptions = await getCategories();
    } catch (error) {
      console.error(error);
    }

    setOptions(categoriesOptions);
  };

  React.useEffect(() => {
    getallCategories();
  }, []);

  React.useEffect(() => {
    if (selectedCategories !== undefined) {
      setValue(selectedCategories);
    }
  });
  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, v: Category[]) => {
        handleChangeCategories(v);
        setValue(v);
      }}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      value={value}
      renderInput={(params) => <TextField {...params} label="Categories" variant="standard" type="text" inputProps={{ 'aria-label': 'categories input' }} />}
    />
  );
}

export default AutocompleteCategories;
