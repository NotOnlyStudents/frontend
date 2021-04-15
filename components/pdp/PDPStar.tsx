import { Box, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';

interface Props {
  id: string
  evidance: boolean
}

function PDPStar({ id, evidance }: Props): React.ReactElement {
  // const handleChangeEvidance =

  return (
    <Box>
      { evidance
        ? (
          <IconButton>
            <StarIcon />
          </IconButton>
        ) : (
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        ) }
    </Box>
  );
}

export default PDPStar;
