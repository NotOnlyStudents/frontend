import Layout from '../components/Layout';
import {CartItems} from '../components/cart/cartItems';
import cartService from '../services/cartService';
import {Cart} from '../interfaces/cart';


function cartPage(){

  
const c:Cart = cartService.getCartItems();
console.log(c["products"][0]['name']);

 return (<Layout title="Cart">
      <h1>Your Cart</h1>
      <CartItems />
    </Layout>
  )
}
  export default cartPage
  