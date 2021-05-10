import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CartProduct } from 'interfaces/products/product';
import {
  Button, Grid, Link, makeStyles,
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
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  image: {
    height: 128,
    width: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  price: {
    alignSelf: 'center',
    paddingLeft: 10,
    // borderBottom: 'solid 1px black',
    // borderRight: 'solid 1px black',
  },
  description: {
    paddingLeft: 7,
    flexDirection: 'column',
    // borderRight: 'solid 1px black',
  },
  text: {
    fontWeight: 500,
  },
  buttonLikeLink: {
    textAlign: 'left',
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
        <Typography>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleClickRemove}
          >
            Remove product
          </Button>
        </Typography>
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
    <Grid container className={classes.root}>
      <Grid item container>
        <CardMedia
          className={classes.image}
          image={item.image}
        />
        <Grid item xs={12} sm container>
          <Grid item xs container className={classes.description}>
            <Grid item container>
              <Grid item>
                <Typography variant="subtitle1" className={classes.text}>
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  <Button
                    href={getViewProductLink(item.id)}
                    component={Link}
                    size="small"
                    color="primary"
                  >
                    See more details
                  </Button>
                </Typography>
                { renderRemoveProductIfInCart() }
                { renderEditQuantityIfInCart() }
                <Typography variant="body2" color="textSecondary">
                  Unit price:
                </Typography>
                <PriceItem
                  price={item.price}
                  discount={item.discount}
                  quantity={item.quantity}
                  discountedPrice={item.discountedPrice}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.price}>
            <Typography variant="subtitle1">
              Price:
              {' '}
              {item.price * item.quantity}
              €
              {' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CartItem;
