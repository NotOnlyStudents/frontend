import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete, Remove } from '@material-ui/icons';
import SnackbarDeleteProductSuccess, { productDeleteSuccess } from 'components/snackbar/product/SnackbarDeleteProductSuccess';
import SnackbarDeleteProductError, { productDeleteError } from 'components/snackbar/product/SnackbarDeleteProductError';

interface Props {
  id: string,
  productName: string
}

function PDPRemove({ id, productName }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const [alert, setAlert] = React.useState({
    [productDeleteSuccess]: false,
    [productDeleteError]: false,
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

  const handleRemoveProduct = () => {
    openAlert(productDeleteSuccess);
    setOpenModal(false);
  };

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete this product?</DialogTitle>
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

      <SnackbarDeleteProductSuccess
        productName={productName}
        open={alert[productDeleteSuccess]}
        handleClose={closeAlert}
      />

      <SnackbarDeleteProductError
        productName={productName}
        open={alert[productDeleteError]}
        handleClose={closeAlert}
      />
    </>
  );
}

export default PDPRemove;
