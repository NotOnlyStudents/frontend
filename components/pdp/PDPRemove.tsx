import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete, Remove } from '@material-ui/icons';
import ProductService from 'services/product-service';
import { useRouter } from 'next/router';

interface Props {
  id: string,
  productName: string
}

function PDPRemove({ id, productName }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const router = useRouter();

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

  const handleRemoveProduct = async () => {
    try {
      await (new ProductService()).deleteProduct(id);

      openAlert(productDeleteSuccess);
      setOpenModal(false);

      router.push('/seller/plp');
    } catch (error) {

    }
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
