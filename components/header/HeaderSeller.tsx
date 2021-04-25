import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';

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
          <IconButton className={classes.desktopIcon} href="/users/personalArea">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <IconButton onClick={signOut} className={classes.desktopIcon}>
            <ExitToAppIcon aria-label="logout" />
          </IconButton>
        ]}
        mobileMenu={[
          <IconButton className={classes.desktopIcon} href="/users/personalArea">
            <AccountCircleIcon aria-label="Your personal area" />
          </IconButton>,
          <Button onClick={signOut}>
            <ExitToAppIcon aria-label="logout" />
          </Button>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
