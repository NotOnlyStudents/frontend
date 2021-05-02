import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Address, AddressValidation } from 'interfaces/address/address';

interface Props {
  category: string;
  creation?: boolean;
  handleChangeAddresses?: (addresses?: Address) => void,
  handleAddAddress?: (add?: Address) => void,
}

interface State {
  category: string;
}

class CategoryEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      category: props.category,
    };
  }







  handleChangeCategory = (category: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.category = category;

      return newState;
    });
  };




/*

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
    } else {
      this.setState({ alert: { [addressNotValidId]: true } });
    }
  };*/

  render() {
    const { category } = this.state;
    const { creation } = this.props;
    return (
      <Card>
        <CardHeader title={(creation) ? 'Add new category' : 'Edit your category'} />
        <CardContent>
          <TextFieldValidation
            id="category"
            label="category"
            placeholder="Insert category"
            margin="normal"
            handleChange={this.handleChangeCategory}
            rules="required"
            helperText="Address is required"
          />
        </CardContent>

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
        />*/