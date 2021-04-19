import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, InputLabel, Link, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import QuantityManager from 'components/quantity/QuantityManager';
import SnackbarChangeQuantitySuccess, { changeQuantitySuccessId } from 'components/snackbar/quantity/SnackbarChangeQuantitySuccess';
import SnackbarChangeQuantityError, { changeQuantityErrorId } from 'components/snackbar/quantity/SnackbarChangeQuantityError';
import SnackbarDeleteProductSuccess, { productDeleteSuccess } from 'components/snackbar/product/SnackbarDeleteProductSuccess';
import SnackbarDeleteProductError, { productDeleteError } from 'components/snackbar/product/SnackbarDeleteProductError';
import PriceItem from 'components/price-item/PriceItem';

interface Props {
  item: CartProduct
  index: number
  handleChangeQuantity: (quantity: number, index: number) => void
  handleRemoveProduct: (index: number) => void
}

const useStyles = makeStyles({
  image: {
    height: '10em',
    width: 200,
  },
});

function CartItem({
  item, index, handleChangeQuantity, handleRemoveProduct,
}:Props) {
  const classes = useStyles();

  const [alert, setAlert] = React.useState({
    [changeQuantitySuccessId]: false,
    [changeQuantityErrorId]: false,

    [productDeleteSuccess]: false,
    [productDeleteError]: false,
  });

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const openAlert = (id: string) => {
    changeAlert(id, true);
  };
  const closeAlert = (id: string) => {
    changeAlert(id, false);
  };

  const handleCounterChange = async (quantity: number) => {
    // Chiamata a put/patch API TODO:

    openAlert(changeQuantitySuccessId);
    handleChangeQuantity(quantity, index);
  };

  const handleClickRemove = async () => {
    openAlert(productDeleteSuccess);
    // Chiamata a put/patch API TODO:

    handleRemoveProduct(index);
  };

  return (
    <Box
      width="100%"
      height="10em"
      borderBottom={1}
      borderColor="primary"
      marginBottom={3}
    >
      <Box display="flex">
        <CardMedia
          className={classes.image}
          image={item.image}
        />
        <Box
          display="flex"
          flexGrow="1"
          paddingLeft={2}
          flexDirection="column"
        >
          <Typography variant="h6" component="div">
            { item.name }
          </Typography>
          <Box>
            <Button
              color="primary"
              variant="text"
              onClick={handleClickRemove}
            >
              Remove product
            </Button>
            <Button
              href={`/pdp/${item.id}`}
              component={Link}
              size="small"
              color="primary"
            >
              See more details
            </Button>
          </Box>
          <Box flexGrow={1} />
          <QuantityManager
            counter={item.quantity}
            handleCounterChange={handleCounterChange}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="20em"
          borderLeft={1}
          borderColor="primary"
        >
          <Typography variant="body1">
            Product price:
          </Typography>
          <PriceItem
            price={item.price}
            discount={item.discount}
            quantity={item.quantity}
          />
        </Box>
      </Box>

      <SnackbarChangeQuantitySuccess
        open={alert[changeQuantitySuccessId]}
        handleClose={closeAlert}
      />

      <SnackbarChangeQuantityError
        open={alert[changeQuantityErrorId]}
        handleClose={closeAlert}
      />

      <SnackbarDeleteProductSuccess
        productName={item.name}
        open={alert[productDeleteSuccess]}
        handleClose={closeAlert}
      />

      <SnackbarDeleteProductError
        productName={item.name}
        open={alert[productDeleteError]}
        handleClose={closeAlert}
      />
    </Box>
  );
}

export default CartItem;
