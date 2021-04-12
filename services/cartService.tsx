//import React from "react";
import {Cart} from "../interfaces/cart";
import {Product} from "../interfaces/product";

    const getCartItems = async(): Promise<Cart> =>
    {
      const p:Product = {
        id: 12345,
        name: "chiodi",
        price: 2,
        description: "dei chiodi",
        image: [''],
        quantity: 4,
        available: false,
        evidence: false,
        discount: 0,
        category: ['']
      }
     // const x={[0]:p};
      const c: Cart ={products: [ p ]};
      return c;
    }

export default getCartItems;
  
  /*
    render() {
      return (
      <>
      <h1>Personal Area:</h1>
        <p>Your name: {this.state.name}</p>
        <p>Your surname: {this.state.surname}</p>
        <p>Your email: {this.state.email}</p> 
        <form onSubmit={this.handleSubmit}>
        <p>Change your name:</p>
        <input
          type='text'
          name='newName'
          onChange={this.handleChange}
        />
        <p>Change your Surname:</p>
        <input
          type='text'
          name='newSurname'
          onChange={this.handleChange}
        />
        <br/>
        <br/>
        <input type="submit" value="Save changes!" />
        </form>
        <br />
        <Link href="/">
            <button name="loginButton" onClick={this.signOut}>Sign out</button>        
        </Link>
        <br />
        <button name="deleteAccountButton" onClick={this.deleteUser}>Delete Account</button>   
      </> 
      );
    }*/
  