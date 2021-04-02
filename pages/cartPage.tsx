import Layout from '../components/Layout'
import CartItems from '../components/cart/cartItems'
function cartPage(){

  
 return (<Layout title="Cart">
      <h1>Your Cart</h1>
      <CartItems />
    </Layout>
  )
}
  export default cartPage
  