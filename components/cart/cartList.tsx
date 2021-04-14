import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Grid } from '@material-ui/core';
import  CartItem  from "./cartItem";


interface Props {
  items: Product[];
}




function CartList({ items }: Props) : React.ReactElement {

  const renderAllItems = (): React.ReactElement[] => items.map(
    (item: Product, index: number): React.ReactElement => (
        <CartItem item={items[0]} />
    ),
  );

  return (
    <div>
      {renderAllItems()}
    </div>
  );
}

export default CartList;

