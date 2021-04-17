import { Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import React from 'react';

interface Props {
  open: boolean;
  severity: Color;
  text: string;
  duration: number;
}

function EMLSnackbar({
  open,
  severity,
  text,
  duration,
}: Props): React.ReactElement {
  return (

    <Snackbar open={open} autoHideDuration={duration}>
      <Alert severity={severity}>
        { text }
      </Alert>
    </Snackbar>
  );
}

export default EMLSnackbar;
