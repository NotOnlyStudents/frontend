import { Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import React from 'react';

interface Props {
  children: string;
  id: string;
  open: boolean;
  severity: Color;
  duration: number;
  handleClose: (id: string) => void;
}

function EMLSnackbar({
  children,
  id,
  open,
  severity,
  duration,
  handleClose,
}: Props): React.ReactElement {
  const onClose = () => {
    handleClose(id);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default EMLSnackbar;
