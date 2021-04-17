import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import HeaderMenuMobile from './HeaderMenuMobile';

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
          <IconButton className={classes.desktopIcon} href="/">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <IconButton className={classes.desktopIcon} href="/">
            <ExitToAppIcon aria-label="logout" />
          </IconButton>,
        ]}
        mobileMenu={[
          <Button href="/" disableRipple>
            <AccountCircleIcon aria-label="Your personal area" />
            Your personal area
          </Button>,
          <Button href="/" disableRipple>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </Button>,
        ]}
      />
    </>
  );
}

export default HeaderCustomer;
