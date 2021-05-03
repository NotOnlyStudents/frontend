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
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { withSSRContext } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import CheckoutButton from 'components/button/CheckoutButton';

interface Props {
  cart: Cart,
  addresses: Address[];
  authState?: AuthState,
  username?: string | undefined,
}

interface State {
  addresses: Address[];
  cart: Cart,
  selectedAddress: number;
  expanded: boolean;
}

class PaymentPage extends React.Component<Props, State> {
  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Cart', href: '/cart' },
    { name: 'Payment' },
  ];

  constructor(props: Props) {
    super(props);

    this.state = {
      cart: props.cart,
      addresses: props.addresses,
      selectedAddress: 0,
      expandend: false,
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

  handleChangeAddress = (value: number) => {
    this.setState({ selectedAddress: value });
  };

  handleAddAddress = (address: Address) => {
    this.setState((state: State) => {
      const newState: State = state;

      newState.addresses.push(address);

      return newState;
    });
  };

  render() {
    const {
      addresses, selectedAddress, cart, expanded,
    } = this.state;
    const { _authState, _username } = this.props;
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
        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          handleChangeIndex={this.handleChangeAddress}
          handleAddNewAddress={this.handleAddAddress}
          handleRemoveOneAddress={this.handleRemoveAddress}
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
          {_authState === AuthState.SignIn && _username ? (
            <>
              <CheckoutButton cartID={_username} />
            </>
          ) : (
            <>
              <Button href="/users/authenticator" component={Link} size="small" color="primary">
                Login to checkout
              </Button>
            </>
          )}
        </Box>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  let addresses = [];
  let products = [];
  let state: AuthState;
  let username: string = null;
  const { Auth } = withSSRContext(context);
  try {
    addresses = await (new AddressService()).getAllAddress();
  } catch (error) {
    console.error(error);
  }
  try {
    products = await (new CartService()).getCartProducts();
  } catch (error) {
    console.log(error);
  }
  try {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    username = user.getUsername();
    state = AuthState.SignIn;
  } catch (error) {
    state = AuthState.SignedOut;
  }
  return {
    props: {
      addresses,
      cart: {
        products,
      },
      _authState: state,
      _username: username,
    },
  };
}

export default PaymentPage;
