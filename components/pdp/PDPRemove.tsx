import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete, Remove } from '@material-ui/icons';

interface Props {
  id: string
}

function PDPRemove({ id }: Props) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleRemoveProduct = () => {
    console.log(`Delete product ${id}`);
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
    </>
  );
}

export default PDPRemove;
