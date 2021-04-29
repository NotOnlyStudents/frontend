import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './HeaderMobileLink';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});

function HeaderCustomer() : React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <IconButton href="/cart" className={classes.desktopIcon}>
            <ShoppingCartIcon />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/">
            <ExitToAppIcon aria-label="logout" />
          </IconButton>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href="/cart">
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink href="/">
            <AccountCircleIcon aria-label="Your personal area" />
            Your personal area
          </HeaderMobileLink>,
          <HeaderMobileLink href="/">
            <ExitToAppIcon aria-label="logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderCustomer;
