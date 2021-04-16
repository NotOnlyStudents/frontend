import React from 'react';
import { ProductFilter } from 'interfaces/products/product';
import { Category } from 'interfaces/categories/category';
import CheckboxEvidence from 'components/checkboxes/checkboxEvidence';
import CheckboxAvailable from 'components/checkboxes/checkboxAvailable';
import AutocompleteCategories from 'components/autocomplete/autocompleteCategories';
import TextfieldMaxPrice from 'components/textfield/textfieldMaxPrice';
import TextfieldMinPrice from 'components/textfield/textfieldMinPrice';

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

  /* <AutocompleteCategories
    selectedCategories={filter.categories}
    handleChangeCategories={this.handleChangeCategories}
  /> */

  return (
    <>
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
    </>
  );
}

export default PLPFilter;
