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

class PLPFilter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleChangeCategories = (categories: Category[]) => {
    const filterCategories: ProductFilter = { ...this.props.filter };
    filterCategories.categories = categories;
    this.props.handleChangeFilter(filterCategories);
  };

  handleChangeEvidence = (evidence: boolean) => {
    const filterEvidence: ProductFilter = { ...this.props.filter };
    filterEvidence.evidence = evidence;
    this.props.handleChangeFilter(filterEvidence);
  };

  handleChangeMinPrice = (minPrice: number) => {
    const filterMinPrice: ProductFilter = { ...this.props.filter };
    filterMinPrice.priceMin = minPrice;
    this.props.handleChangeFilter(filterMinPrice);
  };

  handleChangeMaxPrice = (maxPrice: number) => {
    const filterMaxPrice: ProductFilter = { ...this.props.filter };
    filterMaxPrice.priceMax = maxPrice;
    this.props.handleChangeFilter(filterMaxPrice);
  };

  handleChangeAvailable = (available: boolean) => {
    const filterAvailable: ProductFilter = { ...this.props.filter };
    filterAvailable.available = available;
    this.props.handleChangeFilter(filterAvailable);
  };

  /* <AutocompleteCategories
    selectedCategories={filter.categories}
    handleChangeCategories={this.handleChangeCategories}
  /> */

  render(): React.ReactElement {
    const { filter } = this.props;
    console.log(filter.available);
    return (
      <>
        <CheckboxEvidence
          selectedEvidence={filter.evidence}
          handleChangeEvidence={this.handleChangeEvidence}
        />
        <CheckboxAvailable
          selectedAvailable={filter.available}
          handleChangeAvailable={this.handleChangeAvailable}
        />
        <TextfieldMinPrice
          selectedMinPrice={filter.priceMin}
          handleChangeMinPrice={this.handleChangeMinPrice}
        />
        <TextfieldMaxPrice
          selectedMaxPrice={filter.priceMax}
          handleChangeMaxPrice={this.handleChangeMaxPrice}
        />
      </>
    );
  }
}

export default PLPFilter;
