import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';
import AddProductIcon from 'components/icons/AddProductIcon';
import PLPIcon from 'components/icons/PLPIcon';
import HeaderMobileLink from './HeaderMobileLink';
import ListAltIcon from '@material-ui/icons/ListAlt';

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
            <AddProductIcon aria-label="Add product" />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/seller/plp">
            <PLPIcon aria-label="Plp" />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/seller/categories">
            <ListAltIcon aria-label="Categories" />
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
            <AddProductIcon />
            Add product
          </HeaderMobileLink>,
          <HeaderMobileLink href='/seller/plp'>
          <PLPIcon />
          Plp
        </HeaderMobileLink>,
         <HeaderMobileLink href='/seller/categories'>
         <ListAltIcon />
         Categories
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
