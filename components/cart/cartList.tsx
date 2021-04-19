import React from 'react';
import { CartProduct, Product } from 'interfaces/products/product';
import { Box, Button, Typography } from '@material-ui/core';
import ShopIcon from '@material-ui/icons/Shop';
import CartItem from './cartItem';

interface Props {
  items: CartProduct[];
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

  renderAllItems = (): React.ReactElement[] => (
    this.state.items.map(
      (item: Product, index: number): React.ReactElement => (
        <CartItem
          key={item.id}
          item={item}
          index={index}
          handleChangeQuantity={this.handleChangeQuantity}
          handleRemoveProduct={this.handleRemoveProduct}
        />
      ),
    ));

  render() {
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShopIcon />}
          >
            Buy
          </Button>
        </Box>
        {this.renderAllItems()}
      </Box>
    );
  }
}

export default CartList;
