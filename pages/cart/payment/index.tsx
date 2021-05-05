import React from 'react';
import Head from 'next/head';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { Cart } from 'interfaces/cart/cart';
import { Address } from 'interfaces/address/address';
import AddressList from 'components/address/AddressList';
import AddressService from 'services/address-service';
import {
  Box,
  Button, Collapse, IconButton, Link, TextField, Typography,
} from '@material-ui/core';
import CartService from 'services/cart-service';
import CartList from 'components/cart/cartList';
import { ExpandLess, ExpandMore, LensTwoTone } from '@material-ui/icons';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import AuthContextProvider, { AuthContext, useAuthContext } from 'lib/authContext';
import { getCartLink, getHomeLink, getLoginLink } from 'lib/links';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CheckoutButton from 'components/button/CheckoutButton';
import { CognitoUser } from '@aws-amplify/auth';
import { SignedState } from 'interfaces/login';

interface Props {
  cart: Cart,
  addresses?: Address[],
  token?: string,
  username: string
}

interface State {
  addresses: Address[];
  cart: Cart,
  selectedAddress: number;
  expanded: boolean;
}

class PaymentPage extends React.Component<Props, State> {
  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Cart', href: getCartLink(), icon: ShoppingCartIcon },
    { name: 'Payment' },
  ];

  // context: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      cart: props.cart,
      addresses: props.addresses,
      selectedAddress: 0,
      expanded: false,
    };
  }

  handleRemoveAddress = (index: number) => {
    this.setState((state: State) => {
      const newState: State = state;
      newState.addresses.splice(index, 1);
      if (index < state.selectedAddress) {
        newState.selectedAddress -= 1;
      }
      if (index === state.selectedAddress) {
        if (state.addresses.length === 0) {
          newState.selectedAddress = -1;
        } else {
          newState.selectedAddress = (index + 1) % newState.addresses.length;
        }
      }
      return newState;
    });
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleChangeSelectedAddress = (value: number) => {
    this.setState({ selectedAddress: value });
  };

  handleChangeAddress = (address: Address, index: number = -1) => {
    this.setState((state: State) => {
      const newState: State = state;

      if (index >= 0) {
        newState.addresses[index] = address;
      } else {
        if (!newState.addresses.length) {
          newState.selectedAddress = 0;
        }

        newState.addresses.push(address);
      }

      return newState;
    });
  };

  render() {
    const {
      addresses, selectedAddress, cart, expanded,
    } = this.state;

    const { token, username } = this.props;

    return (
      <>
        <Head>
          <title>Payment | EmporioLambda</title>
        </Head>
        <EMLBreadcrumb paths={this.breadcrumbPaths} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            Cart Products
          </Typography>
          <IconButton onClick={this.handleExpandClick} aria-expanded={expanded} aria-label="show more">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CartList items={cart.products} payment />
        </Collapse>
        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          handleChangeIndex={this.handleChangeSelectedAddress}
          handleChangeAddress={this.handleChangeAddress}
          handleRemoveOneAddress={this.handleRemoveAddress}
          token={token}
        />
        <TextField
          id="description"
          label="Additional informations"
          placeholder="Add more information for order delivery"
          fullWidth
          multiline
          variant="outlined"
          margin="normal"
        />
        <Box width="100%" display="flex" justifyContent="flex-end">
          <CheckoutButton cartID={username} />
        </Box>
      </>
    );
  }
}

PaymentPage.contextType = AuthContext;

export async function getServerSideProps(context) {
  let products = [];
  let addresses = [];
  let token: string = null;
  const { Auth } = withSSRContext(context);
  let state;
  let username;

  try {
    const user = await Auth.currentAuthenticatedUser();
    token = user.signInUserSession.idToken.jwtToken;
    username = user.getUsername();
    state = AuthState.SignIn;
    try {
      addresses = await (new AddressService()).getAllAddress(token);
    } catch (error) {
      console.error(error);
    }
  } catch (e) {
    console.error(e);
    state = AuthState.SignedOut;
    username = '';
  }
  try {
    products = await (new CartService()).getCartProducts();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      addresses,
      cart: {
        products,
      },
      authState: state,
      username,
      token,
    },
  };
}

export default PaymentPage;
