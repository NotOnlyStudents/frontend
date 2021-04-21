import {
  IconButton, makeStyles, Link, Icon,
} from '@material-ui/core';
import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HeaderMenuMobile from './HeaderMenuMobile';

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
          <IconButton href="/authenticator" className={classes.desktopIcon}>
            <LoginIcon />
          </IconButton>,
        ]}
        mobileMenu={[
          <Link href="/cart">
            <ShoppingCartIcon />
            Cart
          </Link>,
          <Link href="/" underline="none">
            <LoginIcon />
            Login
          </Link>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
