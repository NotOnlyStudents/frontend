import React from 'react';
import {
  Link, Typography,
} from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import NoResult, { noResultStyle } from './NoResult';

function NoProductInCart() {
  const classes = noResultStyle();

  return (
    <NoResult
      icon={RemoveShoppingCartIcon}
    >
      Any product into the cart
      <br />
      return to
      {' '}
      <Link
        href="/"
        className={classes.link}
        underline="always"
      >
        home
      </Link>
      {' '}
      and start shopping!
    </NoResult>
  );
}

export default NoProductInCart;
