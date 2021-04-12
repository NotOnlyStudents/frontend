import Layout from '../components/Layout';
import CartItems from '../components/cart/cartItems';
import getCartItems from '../services/cartService';
import {Cart} from '../interfaces/cart';

interface Props {
  cart: Cart;
}


function cartPage({ cart }: Props){

console.log(cart["products"][0]);

 return (<>
      <h1>Your Cart</h1>
      <CartItems items={cart["products"]}/>
    </>
  )
}



export async function getServerSideProps() {
  let cart;

  try {
    cart = await getCartItems();;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      cart,
    },
  };
}
  export default cartPage
  