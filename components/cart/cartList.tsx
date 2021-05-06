import React from 'react';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import { useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { getLoginLink, getPaymentLink } from 'lib/links';
import CartService from 'services/cart-service/CartServiceFetch';
import { Auth } from 'aws-amplify';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import CartItem from './cartItem';

interface Props {
  products: CartProduct[];
  payment?: boolean;
}

function CartList({ products, payment }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const { signedState } = useAuthContext();

  const [cartProducts, setCartProducts] = React.useState(products);

  const handleChangeQuantity = async (quantity: number, index: number): Promise<void> => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      await (new CartService()).patchCartProducts(token, cartProducts[index].id, quantity);

      const newCartProducts = [...cartProducts];

      newCartProducts[index].quantity = quantity;

      setCartProducts(newCartProducts);

      openSnackbar(Snackbars.changeQuantitySuccessId);
    } catch (error) {
      openSnackbar(Snackbars.changeQuantityErrorId);
    }
  };

  const handleRemoveProduct = async (index: number): Promise<void> => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

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

  const renderAllItems = (): React.ReactElement[] => (
    cartProducts.map(
      (item: CartProduct, index: number): React.ReactElement => (
        <CartItem
          key={item.id}
          item={item}
          index={index}
          handleChangeQuantity={handleChangeQuantity}
          handleRemoveProduct={handleRemoveProduct}
          payments={payment}
        />
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
                Total price: &nbsp;
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
