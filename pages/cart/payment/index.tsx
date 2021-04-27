import React from 'react';

import Head from 'next/head';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { Cart } from 'interfaces/cart/cart';
import { Address } from 'interfaces/address/address';
import AddressList from 'components/address/AddressList';
import AddressService from 'services/address-service';
import { Button, Link, TextField } from '@material-ui/core';
import CartService from 'services/cart-service';
import CartList from 'components/cart/cartList';

interface Props {
  cart: Cart,
  addresses: Address[];
}

interface State {
  addresses: Address[];
  cart: Cart,
  selectedAddress: number;
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
    };
  }

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
    const { addresses, selectedAddress, cart } = this.state;
    return (
      <>
        <Head>
          <title>Payment | EmporioLambda</title>
        </Head>
        <EMLBreadcrumb paths={this.breadcrumbPaths} />
        <CartList items={cart.products} payment />
        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          handleChangeIndex={this.handleChangeAddress}
          handleAddNewAddress={this.handleAddAddress}
        />
        <TextField
          id="description"
          label="Address description"
          placeholder="Insert some detail of your address"
          fullWidth
          multiline
          variant="outlined"
          margin="normal"
        />
        <Button component={Link} variant="contained" color="primary" href="/plp"> Checkout </Button>
      </>
    );
  }
}

export async function getServerSideProps() {
  let addresses = [];
  let products = [];
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
  return {
    props: {
      addresses,
      cart: {
        products,
      },
    },
  };
}

export default PaymentPage;
