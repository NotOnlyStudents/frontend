import React from 'react';
import { Address } from 'interfaces/address/address';
import {
  Box,
  Button,
  Dialog,
  FormControl, FormLabel, Grid, RadioGroup,
} from '@material-ui/core';
// import { Cart } from 'interfaces/cart/cart';
import AddressEdit from './AddressEdit';
import AddressView from './AddressView';

interface Props {
  addresses: Address[];
  handleChangeIndex: (value: number) => void,
  handleAddNewAddress: (address: Address, index?: number) => void,
  selectedAddress: number,
  handleRemoveOneAddress: (index: number) => void,
}

function AddressList({
  addresses,
  handleAddNewAddress,
  handleChangeIndex,
  selectedAddress,
  handleRemoveOneAddress,
}: Props) : React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const newAddress: Address = {
    id: '',
    nation: '',
    city: '',
    address: '',
    cap: 0,
  };

  const handleCloseDialog = (address?: Address) => {
    if (address) {
      handleAddNewAddress(address);
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeIndex(+event.target.value);
  };

  const renderAllAddress = (): React.ReactElement[] => addresses.map(
    (address: Address, index: number): React.ReactElement => (
      <AddressView
        key={address.id}
        address={address}
        handleAddNewAddress={handleCloseDialog}
        index={index}
        handleRemoveAddress={handleRemoveOneAddress}
      />
    ),
  );

  return (
    <Box>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Addresses</FormLabel>
        <RadioGroup aria-label="address" name="address" value={selectedAddress} onChange={handleChange}>
          {renderAllAddress()}
        </RadioGroup>
      </FormControl>
      <Button
        color="primary"
        variant="text"
        onClick={handleClickOpen}
      >
        Add new address
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <AddressEdit address={newAddress} handleAddAddress={handleCloseDialog} creation />
      </Dialog>
    </Box>
  );
}

export default AddressList;
