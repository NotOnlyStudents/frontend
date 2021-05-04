import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Address, AddressValidation } from 'interfaces/address/address';
import { Category } from 'interfaces/categories/category';

interface Props {
  category: Category;
  creation?: boolean;
  handleChangeAddresses?: (addresses?: Address) => void,
  handleAddAddress?: (add?: Address) => void,
}

interface State {
  category: Category;
  error: [key: string]: boolean
}

class CategoryEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      category: props.category,
      error: {
        category: false,
      },
    };
  }

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.error[id] = error;

      return newState;
    });
  };

  handleChangeCategory = (category: Category) => {
    this.setState((state: State) => {
      const newState = state;

      newState.category = category;

      return newState;
    });
  };

  handleClickSave = async () => {
    if (this.checkValidation()) {
      const { address } = this.state;

      let newAddress: Address;

      const ps: AddressServiceType = new AddressService();

      if (address.id) {
        newAddress = await ps.editAddress(address.id, address);
      } else {
        newAddress = await ps.createAddress(address);
      }

      if (this.props.creation) {
        this.props.handleAddAddress(newAddress);
      } else {
        this.props.handleChangeAddresses(newAddress);
      }
    }
  };

  render() {
    const { category, error } = this.state;
    const { creation } = this.props;
    return (
      <Card>
        <CardHeader title={(creation) ? 'Add new category' : 'Edit your category'} />
        <CardContent>
          <TextFieldValidation
            id="category"
            label="Category"
            placeholder="Insert category"
            margin="normal"
            handleChange={this.handleChangeCategory}
            rules="required"
            value={category}
            error={error.category}
            helperText="Category name is required"
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickCancel}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default CategoryEdit;

/*        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickCancel}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </CardActions>
        <SnackbarAddressNotValid
          open={alert[addressNotValidId]}
          handleClose={this.handleCloseAlert}
        /> */
