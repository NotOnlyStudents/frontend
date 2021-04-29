import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
// import SnackbarDeleteAddressSuccess, { addressDeleteSuccess } from 'components/snackbar/product/SnackbarDeleteProductSuccess';
// import SnackbarDeleteAddressError, { addressDeleteError } from 'components/snackbar/product/SnackbarDeleteProductError';
import AddressService from 'services/address-service';

interface Props {
  id: string,
  onRemove: () => void,
}

function AddressRemove({ id, onRemove }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const [alert, setAlert] = React.useState({
    [addressDeleteSuccess]: false,
    [addressDeleteError]: false,
  });

  const changeAlert = (alertId: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[alertId] = show;

    setAlert(newAlert);
  };

  const openAlert = (alertId: string) => {
    changeAlert(alertId, true);
  };
  const closeAlert = (alertId: string) => {
    changeAlert(alertId, false);
  };

  const handleRemoveProduct = async () => {
    try {
      await (new AddressService()).deleteAddress(id);

      openAlert(addressDeleteSuccess);
      setOpenModal(false);
      onRemove();
    } catch (error) {

    }
  };

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete this address?</DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpenModal(false); }} color="primary">
            NO
          </Button>
          <Button onClick={handleRemoveProduct} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton color="primary" onClick={() => { setOpenModal(true); }}>
        <Delete />
      </IconButton>

      <SnackbarDeleteAddressSuccess
        open={alert[addressDeleteSuccess]}
        handleClose={closeAlert}
      />

      <SnackbarDeleteAddressError
        open={alert[addressDeleteError]}
        handleClose={closeAlert}
      />
    </>
  );
}

export default AddressRemove;
