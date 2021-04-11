import React from 'react';
import {
  Typography, Box, IconButton,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

interface Props {
  counter: number;
}

function QuantityManager({ counter }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <IconButton color="secondary">
        <Remove />
      </IconButton>
      <Typography variant="button" display="block">
        {counter}
      </Typography>
      <IconButton color="primary">
        <Add />
      </IconButton>
    </Box>
  );
}

export default QuantityManager;
