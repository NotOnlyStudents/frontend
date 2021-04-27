import React from 'react';
import {
  Dialog, FormControlLabel, IconButton, Radio,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Address } from 'interfaces/address/address';
import AddressEdit from './AddressEdit';

interface Props {
  address: Address,
  index: number,
  handleAddNewAddress: (address: Address, index?: number) => void,
}

function AddressView({ address, handleAddNewAddress, index }: Props) {
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
      <Dialog open={edit} onClose={handleCloseEdit}>
        <AddressEdit address={address} handleChangeAddresses={handleCloseDialog} />
      </Dialog>
    </>
  );
}

export default AddressView;
