import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HeaderMobileLink from './HeaderMobileLink';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});

function HeaderSeller({signOut}) : React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <IconButton className={classes.desktopIcon} href='/seller/pdp/new'>
            <AddShoppingCartIcon aria-label="logout" />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/users/personalArea">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <IconButton onClick={signOut} className={classes.desktopIcon}>
            <ExitToAppIcon aria-label="logout" />
          </IconButton>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href='/seller/pdp/new'>
            <AddShoppingCartIcon aria-label="Add product" />
            Add product
          </HeaderMobileLink>,
          <HeaderMobileLink href="/users/personalArea">
            <AccountCircleIcon aria-label="Your personal area" />
            Personal Area
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={signOut}>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
