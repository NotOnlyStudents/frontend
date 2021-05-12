import React from 'react';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import { AuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { getLoginLink, getPaymentLink } from 'lib/links';
import CartService from 'services/cart-service';
import { Auth } from 'aws-amplify';
import { productToCartProduct } from 'interfaces/products/product-converter';
import CartItem from './cartItem';


interface Props {
  items: CartProduct[];
  payment?: boolean;
  authenticated: boolean;
}

interface State{
  items: CartProduct[];
}

class CartList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { items: props.items };
  }
  /*      {
        id:products.id,
        name:products.name,
        description:products.description.name,
        price:products.price,
        quantity:products.quantity,
        available:products.available,
        evidence:products.evidence,
        categories: products.categories,
        images: products.images
      } */
<<<<<<< HEAD

  componentDidMount() {
    // Allow a not authenticated user to access his local cart
    if (localStorage.getItem('item') != null) {
      let storage = localStorage.getItem('item');
      if (storage[storage.length - 1] === ',') {
        storage = storage.slice(0, -1);
=======
  componentDidMount()
  {
    //Allow a not authenticated user to access his local cart
    //So... if not authenticated:
    if(localStorage.getItem('item')!=null)
    {
      var storage = localStorage.getItem('item');
      if(storage[storage.length-1]==',')
      {
          storage = storage.slice(0,-1);
>>>>>>> cart
      }
      storage = `[${storage}]`;
      const products = JSON.parse(storage);
      this.setState({ items: products.map(productToCartProduct) });
    }
  }

  handleChangeQuantity = async (quantity: number, index: number): Promise<void> => {
    let token: string;
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) { console.log(error); } finally {
      await (new CartService()).patchCartProducts(token, this.state.items[index].id, quantity);
      this.setState((state: State) => {
        const newState: State = state;
        newState.items[index].quantity = quantity;
        return newState;
      });
    }
  };

  handleRemoveProduct = async (index: number): Promise<void> => {
    let token = '';
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
      console.log(index);
    } catch (error) {
      console.log(error);
    } finally {
      await new CartService().deleteCartProducts(token, this.state.items[index].id);
      this.setState((state: State) => {
        const newState: State = state;

        newState.items.splice(index, 1);

        return newState;
      });
    }
  };

  calculateTotalPrice = (): number => (
    this.state.items
      .map((item: CartProduct) => (item.quantity * item.price))
      .reduce(
        (totalPrice, price): number => (
          totalPrice + price
        ),
        0,
      )
  );

  renderPaymentButtonIfLogged = () => {
    const { signedState } = this.context;
    const { payment } = this.props;

    const button = signedState === SignedState.Customer
      ? (
        <Button
          variant="contained"
          color="primary"
          href={getPaymentLink()}
          startIcon={<ShopIcon />}
        >
          Buy
        </Button>
      )
      : (
        <Button
          variant="contained"
          color="primary"
          href={getLoginLink()}
          startIcon={<ShopIcon />}
        >
          Login to buy it
        </Button>
      );

    return !payment ? button : <></>;
  };

  renderAllItems = (): React.ReactElement[] =>
  // const { signedState } = useAuthContext();

  // if authenticated
    (this.state.items.map(
      (item: CartProduct, index: number): React.ReactElement => (
        <CartItem
          key={item.id}
          item={item}
          index={index}
          handleChangeQuantity={this.handleChangeQuantity}
          handleRemoveProduct={this.handleRemoveProduct}
          payments={this.props.payment}
        />
      ),
    ))

  /*    if (this.props.authenticated==true)
    {else{
      return null;
    } */
  ;

  render() {
    const { payment } = this.props;
    return (
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box
            display="flex"
            marginRight={2}
          >
            <Typography>
              Total price: &nbsp;
            </Typography>
            <Typography variant="button">
              {`${this.calculateTotalPrice()}€`}
            </Typography>
          </Box>
          { this.renderPaymentButtonIfLogged() }
        </Box>
        {this.renderAllItems()}
      </Box>
    );
  }
}

CartList.contextType = AuthContext;

export default CartList;
function openSnackbar(changeQuantitySuccessId: any) {
  throw new Error('Function not implemented.');
}

