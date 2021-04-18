import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';
import { makeStyles } from '@material-ui/core';

interface Props {
  selectedCategories: Category[],
  handleChangeCategories: (categories: Category[]) => void
}

const useStyles = makeStyles({
  categories: {
    padding: '0.5em',
  },
});

function AutocompleteCategories(
  { selectedCategories, handleChangeCategories }: Props,
) {
  const [options, setOptions] = React.useState<Category[]>([]);
  const classes = useStyles();

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
      className={classes.categories}
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
          variant="outlined"
          label="Categories value"
          placeholder="Insert categories"
        />
      )}
    />
  );
}

export default AutocompleteCategories;
