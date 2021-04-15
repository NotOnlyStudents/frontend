import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Box, Grid } from '@material-ui/core';
import  CartItem  from "./cartItem";


interface Props {
  items: Product[];
}




function CartList({ items }: Props) : React.ReactElement {

  const renderAllItems = (): React.ReactElement[] => items.map(
    (item: Product, index: number): React.ReactElement => (
        <Box key={items[index].id}>
        <CartItem item={items[index]} />
        </Box>
    ),
  );

  return (
    <div>
      {renderAllItems()}
    </div>
  );
}

export default CartList;

