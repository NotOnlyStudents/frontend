import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Box, Grid, Typography } from '@material-ui/core';
import  CartItem  from "./cartItem";


interface Props {
  items: Product[];
}




function CartList({ items }: Props) : React.ReactElement {

    var tot=0;
    for(var i = 0; i<items.length;i++)
    {
      tot += items[i].price * items[i].quantity;
    }
    var totalPrice:string = "Total cart price: " +tot+ "€";
    const renderAllItems = items.length? (): React.ReactElement[] => items.map(
      (item: Product, index: number): React.ReactElement => (
          <Box key={items[index].id}>
          <CartItem item={items[index]} />
          </Box>
      ),
    ) : //Page for empty cart?
    (): React.ReactElement =>{totalPrice=""; return(<div> The cart is empty</div>);}

  return (
    <div>
      {renderAllItems()}
      <div>{totalPrice}</div>
    </div>
  );
}

export default CartList;

