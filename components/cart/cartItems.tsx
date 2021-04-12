import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Grid } from '@material-ui/core';
import  CartItem  from "./cartItem";

interface Props {
  items: Product[];
}

function CartItems({ items }: Props) : React.ReactElement {
  const renderAllItems = (): React.ReactElement[] => items.map(
    (item: Product, index: number): React.ReactElement => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <CartItem product={item} />
      </Grid>
    ),
  );

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {renderAllItems()}
    </Grid>
  );
}

export default CartItems;

