import {
  IconButton, makeStyles, Link,
} from '@material-ui/core';
import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
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
          <IconButton href="/" className={classes.desktopIcon}>
            <LoginIcon />
          </IconButton>,
        ]}
        mobileMenu={[
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
