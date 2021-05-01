import {
  IconButton, makeStyles,
} from '@material-ui/core';
import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './HeaderMobileLink';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});

function HeaderNotAuthenticated(): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <IconButton href="/cart" className={classes.desktopIcon}>
            <ShoppingCartIcon />
          </IconButton>,
          <IconButton href="/users/authenticator" className={classes.desktopIcon}>
            <LoginIcon />
          </IconButton>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href="/cart">
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink href="/users/authenticator">
            <LoginIcon />
            Login
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
