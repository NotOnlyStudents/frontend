import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';


interface Props {
  id: string,
  onRemove: () => void
}

function CategoryRemove({ id, onRemove }: Props) {
  const [openModal, setOpenModal] = React.useState(false);


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
          <Button color="primary" autoFocus>
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

export default CategoryRemove;
