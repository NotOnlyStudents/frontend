import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { getCartLink, getHomeLink, getPersonalAreaLink } from 'lib/links';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderCustomer() : React.ReactElement {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      await router.push(getHomeLink());
      router.reload();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <HeaderDesktopLink href={getCartLink()}>
            <ShoppingCartIcon />
          </HeaderDesktopLink>,
          <HeaderDesktopLink href={getPersonalAreaLink()}>
            <AccountCircleIcon aria-label="Your personal area" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink onClick={handleSignOut}>
            <ExitToAppIcon aria-label="logout" />
          </HeaderDesktopLink>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href="/cart">
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink href={getPersonalAreaLink()}>
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
