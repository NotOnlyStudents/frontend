import React from 'react';
import cartService from '../../services/cartService';
import { Cart } from '../../interfaces/cart';

export default class CartItems extends React.Component{
    /*constructor() {
        super();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }*/
/*
  async handleSubmit(event) {
    event.preventDefault();
    try{
      if(this.state.newName == '' && this.state.newSurname == '')
      {
        alert("Please insert some data");
        
      }
      else
      {
        const user = await Auth.currentAuthenticatedUser();
        if(this.state.newName!= '')
        {
          await Auth.updateUserAttributes(user, {
            'name': this.state.newName});
        }
        if(this.state.newSurname!='')
        {        
          await Auth.updateUserAttributes(user, {
          'custom:surname': this.state.newSurname});
        }
        alert("Data updated successfully");
        document.location.href="/";
      }
    }
    catch{
      alert("There was a problem with the server"); 
    }
  }*/
  render() {
    const c:Cart = cartService.getCartItems();
    console.log(c["products"]);
    return (
    <></>
    );
  }
}
