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
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Cart', href: '/cart' },
    { name: 'Payment' },
  ];

  context: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      cart: props.cart,
      addresses: [],
      selectedAddress: 0,
      expandend: false,
    };
  }

  componentDidMount = async () => {
    const token: string = 'eyJraWQiOiJtSk5lNytEQkZET1R3QXNSdEVMSUtHM3psaDdVUFwvUDhycGFwNDZYVW9DUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkYzllNGY3OC0wMmMyLTRmZTYtODMzZC1iYTg5YWQ0NTJkYzQiLCJhdWQiOiI1ZWw5Y3NoaTVpbmxkaG1uZW52NTNybmRtcyIsImNvZ25pdG86Z3JvdXBzIjpbImJ1eWVycyJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImV2ZW50X2lkIjoiOWNlZTdjMjUtNzk0OS00NGI5LTk3OTEtOGRkMDI1ZjNhYzYyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MjAyMTAyOTUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX2k3WU5vdXBPUyIsImNvZ25pdG8';
    let addresses: Address[] = [];
    try {
      addresses = await (new AddressService()).getAllAddress(token);
      this.setState({ addresses });
    } catch (e) {
      console.error(e);
    }
  };

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
    const {
      authstate,
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
        { authstate === AuthState.SignIn
          ? (
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              handleChangeIndex={this.handleChangeAddress}
              handleAddNewAddress={this.handleAddAddress}
              handleRemoveOneAddress={this.handleRemoveAddress}
              token={this.props.token}
            />
          ) : (
            <Button
              component={Link}
              color="primary"
              href="/login"
            >
              Login to see your address
            </Button>
          )}
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

export async function getServerSideProps() {
  let products = [];
  try {
    products = await (new CartService()).getCartProducts();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      cart: {
        products,
      },
    },
  };
}

export default PaymentPage;
