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
  return (
    <Box p={2}>
      <AutocompleteCategories
        selectedCategories={filter.categories}
        handleChangeCategories={handleChangeCategories}
      />
      <Box m={1}>
        <CheckboxEvidence
          selectedEvidence={filter.evidence}
          handleChangeEvidence={handleChangeEvidence}
        />
        <CheckboxAvailable
          selectedAvailable={filter.available}
          handleChangeAvailable={handleChangeAvailable}
        />
      </Box>
      <Box>
        <TextfieldMinPrice
          selectedMinPrice={filter.priceMin}
          selectedMaxPrice={filter.priceMax}
          handleChangeMinPrice={handleChangeMinPrice}
        />
        <TextfieldMaxPrice
          selectedMaxPrice={filter.priceMax}
          selectedMinPrice={filter.priceMin}
          handleChangeMaxPrice={handleChangeMaxPrice}
        />
      </Box>
      <SortProducts
        sort={filter.sort}
        handleChangeSort={handleChangeSort}
      />
    </Box>
  );
}

export default PLPFilter;
