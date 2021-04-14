import React from 'react';
import TextField from '@material-ui/core/TextField';

import { ProductFilter } from 'interfaces/products/product';
import AsynchronousAutocomplete from 'components/autocomplete/autocomplete'
import { Category } from 'interfaces/products/category';

interface Props {
  filter: ProductFilter;
  handleChangeFilter: (filter: ProductFilter) => void;
}

interface State {
  categoriesOptions?: Category[]
  evidence?: string
}

class PLPFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleChangeCategories(categories: Category[]) {
    //this.setState({categories})
    console.log(categories);
  }
  /* Evidence() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "product in evidence" }}
          />
        }
        label="evidence"
      />
    );
  } */

  render(): React.ReactElement {
    return (
      <>
      <AsynchronousAutocomplete handleChangeCategories={this.handleChangeCategories}/>
        <TextField
          id="minNumber"
          label="Min"
          type="number"
        />
        <TextField
          id="maxNumber"
          label="Max"
          type="number"
        />
      </>
    );
  }
}

export default PLPFilter;
