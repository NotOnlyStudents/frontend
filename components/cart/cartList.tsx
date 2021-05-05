import React from 'react';
import { CartProduct } from 'interfaces/products/product';
import {
  Box, Button, Link, Typography,
} from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import { AuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { getLoginLink, getPaymentLink } from 'lib/links';
import CartItem from './cartItem';

interface Props {
  items: CartProduct[];
  payment?: boolean;
}

interface State{
  items: CartProduct[];
}

class CartList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { items: props.items };
  }

  handleChangeQuantity = (quantity: number, index: number): void => {
    this.setState((state: State) => {
      const newState: State = state;

      newState.items[index].quantity = quantity;

      return newState;
    });
  };

  handleRemoveProduct = (index: number): void => {
    this.setState((state: State) => {
      const newState: State = state;

      newState.items.splice(index, 1);

      return newState;
    });
  };

  handleSubmit = (): void => {
    console.log(this.state);
    // Si prosegue con checkout API TODO:
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

    return (
      !payment
        ? (
          <>
            {button}
          </>
        )
        : <></>
    );
  };

  renderAllItems = (): React.ReactElement[] => (
    this.state.items.map(
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
    ));

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
