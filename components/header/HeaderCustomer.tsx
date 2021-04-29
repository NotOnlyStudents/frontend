import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HeaderMenuMobile from './HeaderMenuMobile';

import { Auth } from 'aws-amplify';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});



function HeaderCustomer({signOut}) : React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <IconButton href="/cart" className={classes.desktopIcon}>
            <ShoppingCartIcon />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/users/personalArea">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <IconButton onClick={signOut} className={classes.desktopIcon}>
            <ExitToAppIcon aria-label="logout" />
          </IconButton>,
        ]}
        mobileMenu={[
          <Link href="/cart">
            <ShoppingCartIcon />
            Cart
          </Link>,
          <Button href="/users/personalArea" disableRipple>
            <AccountCircleIcon aria-label="Your personal area" />
            Your personal area
          </Button>,
          <Button onClick={signOut}>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </Button>,
        ]}
      />
    </>
  );
}

export default HeaderCustomer;