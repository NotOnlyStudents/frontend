import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';

interface Props {
  selectedCategories: Category[],
  handleChangeCategories: (categories: Category[]) => void
}

function AutocompleteCategories(
  { selectedCategories, handleChangeCategories }: Props,
) {
  const [options, setOptions] = React.useState([]);

  const getallCategories = async () => {
    let categoriesOptions = [];

    try {
      categoriesOptions = await (new CategoryService()).getCategories();
    } catch (error) {
      console.error(error);
    }

    setOptions(categoriesOptions);
  };

  React.useEffect(() => {
    getallCategories();
  }, []);

  return (
    <Autocomplete
      multiple
      id="categories"
      options={options}
      onChange={(event, v: Category[]) => {
        handleChangeCategories(v);
      }}
      getOptionLabel={(option) => option}
      fullWidth
      value={selectedCategories}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Categories value"
          placeholder="Insert categories"
        />
      )}
    />
  );
}

export default AutocompleteCategories;
