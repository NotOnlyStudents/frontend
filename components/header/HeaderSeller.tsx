import React from 'react';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, makeStyles } from '@material-ui/core';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './HeaderMobileLink';

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
          <HeaderMobileLink href="/">
            <ExitToAppIcon aria-label="logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
