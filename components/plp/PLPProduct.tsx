import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { PLPProductItem } from 'interfaces/products/product';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link,
} from '@material-ui/core';
import QuantityManager from 'components/quantity-manager/QuantityManager';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PriceItem from 'components/price-item/PriceItem';
import EMLSnackbar from 'components/snackbar/EMLSnackbar';

interface Props {
  product: PLPProductItem
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  image: {
    height: 300,
  },
  notAvailableText: {
    width: '100%',
    textAlign: 'right',
    backgroundColor: 'white',
  },
});

function PLPProduct({ product }: Props) {
  const [counter, setCounter] = React.useState(1);
  const [alert, setAlert] = React.useState({ add_to_cart: false });

  const classes = useStyles();

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const handleCloseAlert = (id: string) => {
    changeAlert(id, false);
  };

  const handleAddToCart = () => {
    changeAlert('add_to_cart', true);
  };

  const showNotAvailableBanner = () : React.ReactElement | void => {
    if (product.quantity <= 0) {
      return (
        <Typography className={classes.notAvailableText} color="error">
          Not available
        </Typography>
      );
    }
  };

  const showInEvidenceBanner = () : React.ReactElement => (product.evidence ? <StarIcon style={{ color: '#FFEB3B' }} fontSize="large" /> : <></>);

  return (
    <>
      <Card className={classes.root}>
        <Box position="relative" display="block">
          <CardMedia
            className={classes.image}
            image={product.image}
          />
          <Box position="absolute" display="flex" flexDirection="column" alignItems="flex-end" width="100%" top={0}>
            { showNotAvailableBanner() }
            { showInEvidenceBanner() }
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            { product.name }
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <QuantityManager counter={counter} handleCounterChange={setCounter} />
            <PriceItem
              price={product.price}
              discount={product.discount}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button component={Link} size="small" color="primary" href={`/pdp/${product.id}`}>
              See more details
            </Button>
            <IconButton color="primary" onClick={handleAddToCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      <EMLSnackbar
        id="add_to_cart"
        open={alert.add_to_cart}
        severity="success"
        duration={4000}
        handleClose={handleCloseAlert}
      >
        { `${product.name} added to cart` }
      </EMLSnackbar>
    </>
  );
}

export default PLPProduct;
