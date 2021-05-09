import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Link, makeStyles,
} from '@material-ui/core';
import QuantityManager from 'components/quantity/QuantityManager';
import PriceItem from 'components/price-item/PriceItem';
import { getViewProductLink } from 'lib/links';

interface Props {
  item: CartProduct
  index: number
  payments?: boolean;
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
  item, index, payments, handleChangeQuantity, handleRemoveProduct,
}: Props) {
  const classes = useStyles();

  const handleCounterChange = (quantity: number) => {
    handleChangeQuantity(quantity, index);
  };

  const handleClickRemove = async () => {
    handleRemoveProduct(index);
  };

  const renderRemoveProductIfInCart = () => (
    (!payments)
      ? (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickRemove}
          >
            Remove product
          </Button>
        </div>
      )
      : <></>
  );

  const renderEditQuantityIfInCart = () => (
    (!payments)
      ? (
        <QuantityManager
          counter={item.quantity}
          handleCounterChange={handleCounterChange}
        />
      )
      : (
        <Typography>
          Quantity:
          {' '}
          {item.quantity}
        </Typography>
      )
  );

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
            { renderRemoveProductIfInCart() }
            <Button
              href={getViewProductLink(item.id)}
              color="primary"
              variant="text"
            >
              See more details
            </Button>
          </Box>
          <Box flexGrow={1} />
          { renderEditQuantityIfInCart() }
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
            discountedPrice={item.discountedPrice}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CartItem;
