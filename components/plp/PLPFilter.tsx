import React from 'react';
import { ProductFilter, SortType } from 'interfaces/products/product';
import { Category } from 'interfaces/categories/category';
import CheckboxEvidence from 'components/checkboxes/checkboxEvidence';
import CheckboxAvailable from 'components/checkboxes/checkboxAvailable';
import AutocompleteCategories from 'components/autocomplete/autocompleteCategories';
import TextfieldMaxPrice from 'components/textfield/textfieldMaxPrice';
import TextfieldMinPrice from 'components/textfield/textfieldMinPrice';
import SortProducts from 'components/sort-products/SortProducts';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {
  filter: ProductFilter;
  seller: boolean;
  handleChangeFilter: (filter: ProductFilter) => void;
}

const useStyles = makeStyles({
  container: {
    margin: '0 2em 2em 2em',
  },
});

function PLPFilter({ filter, seller, handleChangeFilter }: Props) {
  const classes = useStyles();

  const handleChangeCategories = (categories: Category[]) => {
    const filterCategories: ProductFilter = { ...filter };
    filterCategories.categories = categories;
    handleChangeFilter(filterCategories);
  };

  const handleChangeEvidence = (evidence: boolean) => {
    const filterEvidence: ProductFilter = { ...filter };
    filterEvidence.evidence = evidence;
    handleChangeFilter(filterEvidence);
  };

  const handleChangeMinPrice = (minPrice: number) => {
    if (minPrice >= 0) {
      const filterMinPrice: ProductFilter = { ...filter };
      filterMinPrice.priceMin = minPrice;
      handleChangeFilter(filterMinPrice);
    }
  };

  const handleChangeMaxPrice = (maxPrice: number) => {
    if (maxPrice >= 0) {
      const filterMaxPrice: ProductFilter = { ...filter };
      filterMaxPrice.priceMax = maxPrice;
      handleChangeFilter(filterMaxPrice);
    }
  };

  const handleChangeAvailable = (available: boolean) => {
    const filterAvailable: ProductFilter = { ...filter };
    filterAvailable.available = available;
    handleChangeFilter(filterAvailable);
  };

  const handleChangeSort = (sort: SortType) => {
    const filterSort: ProductFilter = { ...filter };
    filterSort.sort = sort;
    handleChangeFilter(filterSort);
  };

  const renderCheckboxAvailableIfSeller = () => (seller
    ? (
      <CheckboxEvidence
        selectedEvidence={filter.evidence}
        handleChangeEvidence={handleChangeEvidence}
      />
    )
    : <></>);

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <AutocompleteCategories
          selectedCategories={filter.categories}
          handleChangeCategories={handleChangeCategories}
        />
        { renderCheckboxAvailableIfSeller() }
        <CheckboxAvailable
          selectedAvailable={filter.available}
          handleChangeAvailable={handleChangeAvailable}
        />
      </Box>
      <Box display="flex">
        <TextfieldMinPrice
          selectedMaxPrice={filter.priceMax}
          handleChangeMinPrice={handleChangeMinPrice}
        />
        <TextfieldMaxPrice
          selectedMaxPrice={filter.priceMax}
          handleChangeMaxPrice={handleChangeMaxPrice}
        />
        <Box flexGrow={1} />
        <SortProducts
          sort={filter.sort}
          handleChangeSort={handleChangeSort}
        />
      </Box>
    </Box>
  );
}

export default PLPFilter;
