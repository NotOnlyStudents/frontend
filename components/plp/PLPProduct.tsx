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
import QuantityManager from 'components/quantity/QuantityManager';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PriceItem from 'components/price-item/PriceItem';
import SnackbarAddToCartSuccess, { addToCartSuccessId } from 'components/snackbar/cart/SnackbarAddToCartSuccess';
import SnackbarAddToCartError, { addToCartErrorId } from 'components/snackbar/cart/SnackbarAddToCartError';

interface Props {
  product: PLPProductItem
  seller?: boolean
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

function PLPProduct({ product, seller }: Props) {
  const [counter, setCounter] = React.useState(1);
  const [alert, setAlert] = React.useState({
    [addToCartSuccessId]: false,
    [addToCartErrorId]: false,
  });

  const classes = useStyles();

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const closeAlert = (id: string) => {
    changeAlert(id, false);
  };

  const openAlert = (id: string) => {
    changeAlert(id, true);
  };

  const handleAddToCart = () => {
    openAlert(addToCartSuccessId);
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

  const renderAddToCartIfCustomer = () => (!seller
    ? (
      <IconButton color="primary" onClick={handleAddToCart}>
        <AddShoppingCartIcon />
      </IconButton>
    )
    : <></>);

  const renderQuantityManagerIfCustomer = () => (!seller
    ? <QuantityManager counter={counter} handleCounterChange={setCounter} />
    : <></>
  );

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
            { renderQuantityManagerIfCustomer() }
            <PriceItem
              price={product.price}
              discount={product.discount}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button
              component={Link}
              size="small"
              color="primary"
              href={seller ? `/seller/pdp/${product.id}` : `/pdp/${product.id}`}
            >
              See more details
            </Button>
            { renderAddToCartIfCustomer() }
          </Box>
        </CardActions>
      </Card>
      <SnackbarAddToCartSuccess
        productName={product.name}
        open={alert[addToCartSuccessId]}
        handleClose={closeAlert}
      />

      <SnackbarAddToCartError
        productName={product.name}
        open={alert[addToCartErrorId]}
        handleClose={closeAlert}
      />
    </>
  );
}

export default PLPProduct;
