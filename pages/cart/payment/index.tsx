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
import { getCartLink, getHomeLink } from 'lib/links';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

interface Props {
  cart: Cart,
  addresses?: Address[];
  authstate?: AuthState;
  username?: string;
  token?: string;
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
    const {
      token,
    } = this.props;
    return (
      <>
        <Head>
          <title>Payment | EmporioLambda</title>
        </Head>
        <EMLBreadcrumb paths={this.breadcrumbPaths} />
        <Typography>
          Cart Products
          <IconButton onClick={this.handleExpandClick} aria-expanded={expanded} aria-label="show more">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CartList items={cart.products} payment />
        </Collapse>
        { /* authstate === AuthState.SignIn
          ? ( */
          <AddressList
            addresses={addresses}
            selectedAddress={selectedAddress}
            handleChangeIndex={this.handleChangeSelectedAddress}
            handleChangeAddress={this.handleChangeAddress}
            handleRemoveOneAddress={this.handleRemoveAddress}
            token={token}
          />
          /* ) : (
            <Button
              component={Link}
              color="primary"
              href="/login"
            >
              Login to see your address
            </Button>
          ) */ }
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
          <Button
            variant="contained"
            color="primary"
            href="/"
          >
            Checkout
          </Button>
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
  try {
    const user = await Auth.currentAuthenticatedUser();
    token = user.signInUserSession.idToken.jwtToken;
    try {
      addresses = await (new AddressService()).getAllAddress(token);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  } catch (e) {
    console.error(e);
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
      token,
    },
  };
}

export default PaymentPage;
