import React from 'react';
import {Product} from 'interfaces/product';
import { Box, Button } from '@material-ui/core';
import  CartItem  from "./cartItem";
import QuantityManager from 'components/quantity-manager/QuantityManager';


interface Props {
  items: Product[];
}

interface State{
  totalPrice: number;
  items: Product[];
}



class CartList extends React.Component<Props,State> {
    constructor(props){
      super(props);
      this.state={totalPrice:0, items:this.props.items};
    }

    componentDidMount()
    {
      this.updateCartPrice;
    }
 
    handleChange = (event): void =>  {
      console.log(event.target);
      var p = this.props.items;
      var i:number= event.target.name;
      p[i].quantity= event.target.value;
      this.setState({items:p});
      //Chiamata a put/patch API TODO:
}


    handleRemove = (event): void => {
      event.preventDefault();
      var i:number=event.target.id;
      var p = this.state.items;
      p.splice(i,1);
      this.setState({items:p});
      //Chiamata a put/patch API TODO:
    }

    handleSubmit = (): void =>
    {
      console.log(this.state); 
      //Si prosegue con checkout API TODO:
    }
    
    updateCartPrice = (): void =>
    {
      var tot=0;
      const items = this.state.items? this.state.items:this.props.items;
      for(var i = 0; i<items.length;i++)
      {
        tot = tot + items[i].price * items[i].quantity;
      }
      this.state={totalPrice:tot, items:items};
    }

    renderAllItems = (): React.ReactElement[] =>{
      this.updateCartPrice();
      const items = this.state.items? this.state.items:this.props.items;
      return(
        items.map(
      (item: Product, index: number): React.ReactElement => (
        <Box key={item.id}>
        <CartItem item={item} index={index} handleChange={this.handleChange} handleRemove={this.handleRemove}/>
        </Box>
      ),));
  }

    renderButton = (): React.ReactElement => {
      if(this.state.items.length!=0)
      { return (<Button id="submit" onClick={this.handleSubmit}> Proceed to order </Button>) }
      else { return null; }

    }



  render() {
   return(
    <div id ="root">
      {this.renderAllItems()}
      <div>{this.state.totalPrice!=0 ? "Total price of the cart: " + this.state.totalPrice + "€" : "The Cart is empty"}</div>
      {this.renderButton()}
    </div>
   );
  }
}



export default CartList;


