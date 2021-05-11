import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { getCartLink, getHomeLink, getPersonalAreaLink } from 'lib/links';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderCustomer() : React.ReactElement {
  const router = useRouter();
  const { setSignedState } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push(getHomeLink());

      setSignedState(SignedState.NotAuthenticated);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <HeaderDesktopLink onClick={() => { router.push(getCartLink()); }}>
            <ShoppingCartIcon />
          </HeaderDesktopLink>,
          <HeaderDesktopLink onClick={() => { router.push(getPersonalAreaLink()); }}>
            <AccountCircleIcon aria-label="Your personal area" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink onClick={handleSignOut}>
            <ExitToAppIcon aria-label="logout" />
          </HeaderDesktopLink>,
        ]}
        mobileMenu={[
          <HeaderMobileLink onClick={() => { router.push(getCartLink()); }}>
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getPersonalAreaLink()); }}>
            <AccountCircleIcon aria-label="Your personal area" />
            Your personal area
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={handleSignOut}>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderCustomer;
