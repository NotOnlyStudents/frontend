import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Box, Grid, Typography } from '@material-ui/core';
import  CartItem  from "./cartItem";
import { SupervisedUserCircleTwoTone } from '@material-ui/icons';


interface Props {
  items: Product[];
}

interface State{
  totalPrice: string;
}



class CartList extends React.Component<Props,State> {
    constructor(props){
      super(props);
      this.state={totalPrice:""};
      const items = props.items;

    }

    
//Se Lista vuota allora ritorna carrello vuoto, sennò renderizza items
    renderAllItems = this.props.items.length? 
    (): React.ReactElement[] => {
      const items = this.props.items;
      var tot=0;
      for(var i = 0; i<items.length;i++)
      {
        tot = tot + items[i].price * items[i].quantity;
      }
      this.state={totalPrice:"Total price of the cart: " + tot + "€"};
      return(
        items.map(
      (item: Product, index: number): React.ReactElement => (
        <Box key={item.id}>
        <CartItem item={item} />
        </Box>
      ),));}
    : 
    (): React.ReactElement =>{return(<div> The cart is empty</div>);}  //Page for empty cart?




  render() {
   return(
   <div>
      {this.renderAllItems()}
      <div>{this.state.totalPrice}</div>
    </div>
   );
  }
}



export default CartList;


