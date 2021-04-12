import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';
import {Product} from '../../interfaces/product';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link,
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

interface Props {
  product: Product
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  image: {
    height: 300,
  },
});

function CartItem({ product }: Props) {

  const classes = useStyles();

  const showNotAvailableBanner = () : React.ReactElement | void => {
    if (product.quantity <= 0) {
      return (
        <Typography variant="caption" color="error">
          Not available
        </Typography>
      );
    }
  };

  const showInEvidenceBanner = () : React.ReactElement | void => {
    if (product.evidence) {
      return (
        <StarIcon color="secondary" />
      );
    }
  };

  return (
    <Card className={classes.root}>
      <Box position="relative" display="block">
        <CardMedia
          className={classes.image}
        />
        <Box position="absolute" display="flex" flexDirection="column" alignItems="flex-end" top={5} right={5}>
          { showInEvidenceBanner() }
          { showNotAvailableBanner() }
        </Box>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          { product.name }
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="button">
            { product.price }
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button component={Link} size="small" color="primary" href={`/pdp/${product.id}`}>
            See more details
          </Button>
          <IconButton color="primary">
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CartItem;