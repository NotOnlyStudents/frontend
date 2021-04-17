import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import HeaderMenuMobile from './HeaderMenuMobile';

const useStyles = makeStyles({
  desktopIcon: {
    color: 'white',
  },
});

function HeaderNotAuthenticated() : React.ReactElement {
  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <Button
            href="/"
            variant="contained"
            color="primary"
          >
            Login!
          </Button>,
        ]}
        mobileMenu={[
          <Button href="/authenticator" disableRipple>
            Login!
          </Button>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
