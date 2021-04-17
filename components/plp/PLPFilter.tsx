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

interface Props {
  filter: ProductFilter;
  handleChangeFilter: (filter: ProductFilter) => void;
}

function PLPFilter({ filter, handleChangeFilter }: Props) {
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
    const filterMinPrice: ProductFilter = { ...filter };
    filterMinPrice.priceMin = minPrice;
    handleChangeFilter(filterMinPrice);
  };

  const handleChangeMaxPrice = (maxPrice: number) => {
    const filterMaxPrice: ProductFilter = { ...filter };
    filterMaxPrice.priceMax = maxPrice;
    handleChangeFilter(filterMaxPrice);
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

  /* <AutocompleteCategories
    selectedCategories={filter.categories}
    handleChangeCategories={this.handleChangeCategories}
  /> */

  return (
    <Box p={2}>
      <CheckboxEvidence
        selectedEvidence={filter.evidence}
        handleChangeEvidence={handleChangeEvidence}
      />
      <CheckboxAvailable
        selectedAvailable={filter.available}
        handleChangeAvailable={handleChangeAvailable}
      />
      <TextfieldMinPrice
        selectedMinPrice={filter.priceMin}
        handleChangeMinPrice={handleChangeMinPrice}
      />
      <TextfieldMaxPrice
        selectedMaxPrice={filter.priceMax}
        handleChangeMaxPrice={handleChangeMaxPrice}
      />
      <SortProducts
        sort={filter.sort}
        handleChangeSort={handleChangeSort}
      />
    </Box>
  );
}

export default PLPFilter;
