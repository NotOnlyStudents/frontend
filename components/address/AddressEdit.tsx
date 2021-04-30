import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import AddressService from 'services/address-service';
import AddressServiceType from 'services/address-service/AddressService';
import SnackbarAddressNotValid, { addressNotValidId } from 'components/snackbar/address/SnackbarAddressNotValid';
import { Address, AddressValidation } from 'interfaces/address/address';

interface AlertState {
  [key: string]: boolean
}

interface Props {
  address: Address;
  creation?: boolean;
  handleChangeAddresses?: (addresses?: Address) => void,
  handleAddAddress?: (add?: Address) => void,
}

interface State {
  address: Address;
  validation: AddressValidation;
  alert: AlertState;
}

class AddressEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      address: props.address,
      validation: {
        nation: false,
        city: false,
        address: false,
        cap: false,
      },
      alert: { [addressNotValidId]: false },
    };
  }

  handleChangeNation = (nation: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.nation = nation;

      return newState;
    });
  };

  handleChangeCity = async (city: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.city = city;

      return newState;
    });
  };

  handleChangeCap = (cap: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.cap = cap;

      return newState;
    });
  };

  handleChangeAddress = (address: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.address.address = address;

      return newState;
    });
  };

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.validation[id] = error;

      return newState;
    });
  };

  checkValidation = () => {
    const { validation } = this.state;

    return Object.values(validation).every(
      (val: boolean) => (!val),
    );
  };

  handleCloseAlert = (id: string) => {
    this.setState((state: State) => {
      const newState: State = state;

      newState.alert[id] = false;

      return newState;
    });
  };

  handleClickCancel = () => {
    if (this.props.creation) {
      this.props.handleAddAddress();
    } else {
      this.props.handleChangeAddresses();
    }
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
    } else {
      this.setState({ alert: { [addressNotValidId]: true } });
    }
  };

  render() {
    const { address, validation, alert } = this.state;
    const { creation } = this.props;
    return (
      <Card id={address.id}>
        <CardHeader title={(creation) ? 'Add new address' : 'Edit your address'} />
        <CardContent>
          <TextFieldValidation
            id="nation"
            label="Nation"
            placeholder="Insert nation"
            value={address.nation}
            fullWidth
            margin="normal"
            helperText="Nation is required"
            handleChange={this.handleChangeNation}
            setError={this.setError}
            error={validation.nation}
            rules="required"
          />
          <TextFieldValidation
            id="city"
            label="city"
            placeholder="Insert city"
            value={address.city}
            margin="normal"
            error={validation.city}
            setError={this.setError}
            handleChange={this.handleChangeCity}
            rules="required"
            helperText="City is required"
          />
          <TextFieldValidation
            id="address"
            label="address"
            placeholder="Insert address"
            value={address.address}
            margin="normal"
            error={validation.address}
            setError={this.setError}
            handleChange={this.handleChangeAddress}
            rules="required"
            helperText="Address is required"
          />
          <TextFieldValidation
            id="cap"
            label="cap"
            placeholder="Insert CAP"
            value={address.cap}
            type="number"
            margin="normal"
            helperText="CAP is required"
            setError={this.setError}
            handleChange={this.handleChangeCap}
            rules="required|numeric"
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
        <SnackbarAddressNotValid
          open={alert[addressNotValidId]}
          handleClose={this.handleCloseAlert}
        />
      </Card>
    );
  }
}
export default AddressEdit;
