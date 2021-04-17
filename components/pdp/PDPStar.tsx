import { Box, IconButton } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import ProductService from 'services/product-service';

interface Props {
  id: string;
  evidance: boolean;
}

function PDPStar({ id, evidance }: Props): React.ReactElement {
  const [ev, setEv] = React.useState(evidance);

  const handleAddEvidance = async () => {
    try {
      await (new ProductService()).addToEvidence(id);
      setEv(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveEvidance = async () => {
    try {
      await (new ProductService()).removeFromEvidence(id);
      setEv(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      { ev
        ? (
          <IconButton
            onClick={handleRemoveEvidance}
          >
            <StarIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleAddEvidance}
          >
            <StarBorderIcon color="primary" />
          </IconButton>
        ) }
    </Box>
  );
}

export default PDPStar;
