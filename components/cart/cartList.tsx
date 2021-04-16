import React from 'react';
//import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';
import {Product} from '../../interfaces/product';
import { Box, Grid, Typography } from '@material-ui/core';
import  CartItem  from "./cartItem";
import { SupervisedUserCircleTwoTone } from '@material-ui/icons';
import ReactDOM from 'react-dom';


interface Props {
  items: Product[];
}

interface State{
  totalPrice: string;
  items: Product[];
}



class CartList extends React.Component<Props,State> {
    constructor(props){
      super(props);
      this.state={totalPrice:"", items:this.props.items};
    }

    handleChange = (event) => {
      event.preventDefault();
      var p = this.props.items;
      var i:number= event.target.name;
      p[i].quantity= event.target.value;
      this.setState({items:p});
      console.log(event.target)
    }

    handleRemove = (event) => {
      event.preventDefault();
      var i:number=event.target.id;
      var p = this.state.items;
      p.splice(i,1);
      this.setState({items:p});
    }
    

//Se Lista vuota allora ritorna carrello vuoto, sennò renderizza items
    renderAllItems = this.props.items.length? 
    (): React.ReactElement[] => {
      const items = this.state.items? this.state.items:this.props.items;
      var tot=0;
      for(var i = 0; i<items.length;i++)
      {
        tot = tot + items[i].price * items[i].quantity;
      }
      this.state={totalPrice:"Total price of the cart: " + tot + "€", items:items};
      return(
        items.map(
      (item: Product, index: number): React.ReactElement => (
        <Box key={item.id}>
        <CartItem item={item} index={index} handleChange={this.handleChange} handleRemove={this.handleRemove} />
        </Box>
      ),));}
    : 
    (): React.ReactElement =>{
      this.state={totalPrice:"", items:this.state.items};
      return(<div> The cart is empty</div>);
    }  //Page for empty cart?




  render() {
   return(
   <div id ="root">
      {this.renderAllItems()}
      <div>{this.state.totalPrice}</div>
    </div>
   );
  }
}



export default CartList;


