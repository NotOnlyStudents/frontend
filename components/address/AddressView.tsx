import React from 'react';
import {
  Dialog, FormControlLabel, IconButton, Radio,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Address } from 'interfaces/address/address';
import AddressEdit from './AddressEdit';
import AddressRemove from './AddressRemove';

interface Props {
  address: Address,
  index: number,
  handleAddNewAddress: (address: Address, index?: number) => void,
  handleRemoveAddress: (index: number) => void,
}

function AddressView({
  address, handleAddNewAddress, index, handleRemoveAddress,
}: Props) {
  const [edit, setEdit] = React.useState(false);

  const handleCloseDialog = (add?: Address) => {
    if (add) {
      handleAddNewAddress(add, index);
    }
    setEdit(false);
  };

  const handleClickEditButton = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  return (
    <>
      <FormControlLabel
        id={address.id}
        value={index}
        control={<Radio />}
        label={`${address.address},${address.city},${address.cap},${address.nation}`}
      />
      <IconButton color="primary" onClick={handleClickEditButton}>
        <Edit />
      </IconButton>
      <AddressRemove id={address.id} onRemove={() => handleRemoveAddress(index)} />
      <Dialog open={edit} onClose={handleCloseEdit}>
        <AddressEdit address={address} handleChangeAddresses={handleCloseDialog} />
      </Dialog>
    </>
  );
}

export default AddressView;
