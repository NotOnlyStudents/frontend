import React from 'react';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import { AuthContext, useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { getLoginLink, getPaymentLink } from 'lib/links';
import CartService from 'services/cart-service/CartServiceLocal';
import { Auth } from 'aws-amplify';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import LoginIcon from 'components/icons/LoginIcon';
import { useRouter } from 'next/router';
import CartItem from './cartItem';
import { productToCartProduct } from 'interfaces/products/product-converter';

interface Props {
  products: CartProduct[];
  payment?: boolean;
  authenticated: boolean;
}

function CartList({ products, payment }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const { signedState } = useAuthContext();
  const router = useRouter();

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
  componentDidMount()
  {
    //Allow a not authenticated user to access his local cart
    if(localStorage.getItem('item')!=null)
    {
      var storage = localStorage.getItem('item');
      if(storage[storage.length-1]==',')
      {
          storage = storage.slice(0,-1);
      }
      storage = '[' + storage + ']';
      const products=JSON.parse(storage);
      this.setState({items: products.map(productToCartProduct)});
    }
  }

  handleChangeQuantity = async (quantity: number, index: number): Promise<void> => {
    var token="";
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) { console.log(error); }
    finally {
      await (new CartService()).patchCartProducts(token, this.state.items[index].id, quantity);
      this.setState((state: State) => {
      const newState: State = state;
      newState.items[index].quantity = quantity;
      return newState;
    });}
  };

  handleRemoveProduct = async (index: number): Promise<void> => {
    var token="";
    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
      console.log(index);
    } catch (error) {
      console.log(error);
    }
    finally{
      await new CartService().deleteCartProducts(token, this.state.items[index].id);
      this.setState((state: State) => {
        const newState: State = state;

      await new CartService().deleteCartProducts(token, cartProducts[index].id);

      const newCartProducts = [...cartProducts];

      newCartProducts.splice(index, 1);

      setCartProducts(newCartProducts);
      openSnackbar(Snackbars.removedFromCartSuccessId);
    } catch (error) {
      openSnackbar(Snackbars.removedFromCartErrorId);
    }
  };

  const calculateTotalPrice = (): number => (
    cartProducts
      .map((item: CartProduct) => (item.quantity * item.price))
      .reduce(
        (totalPrice, price): number => (
          totalPrice + price
        ),
        0,
      )
  );

  const renderPaymentButtonIfLogged = () => {
    const button = signedState === SignedState.Customer
      ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => { router.push(getPaymentLink()); }}
          startIcon={<ShopIcon />}
        >
          Buy
        </Button>
      )
      : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => { router.push(getLoginLink()); }}
          startIcon={<LoginIcon />}
        >
          Login to buy it
        </Button>
      );

    return !payment ? button : <></>;
  };

  const renderAllItems = (): React.ReactElement[] => (
    cartProducts.map(
      (item: CartProduct, index: number): React.ReactElement => (
        <Box key={item.id} marginBottom="4em">
          <CartItem
            item={item}
            index={index}
            handleChangeQuantity={handleChangeQuantity}
            handleRemoveProduct={handleRemoveProduct}
            payments={payment}
          />
        </Box>
      ),
    ));

  const renderPageIfProductsArePresent = () => (
    cartProducts.length !== 0
      ? (
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
                Total price:
                {' '}
              </Typography>
              <Typography variant="button">
                {`${calculateTotalPrice()}€`}
              </Typography>
            </Box>
            { renderPaymentButtonIfLogged() }
          </Box>
          {renderAllItems()}
        </Box>
      )
      : <NoProductInCart />
  );

  return renderPageIfProductsArePresent();
}

export default CartList;
