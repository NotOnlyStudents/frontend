import React from 'react';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});

function HeaderSeller() : React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <IconButton className={classes.desktopIcon} href="/">
            <ExitToAppIcon aria-label="logout" />
          </IconButton>,
        ]}
        mobileMenu={[
          <Button href="/" disableRipple>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </Button>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
