import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getCartLink, getLoginLink } from 'lib/links';
import { useRouter } from 'next/router';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderNotAuthenticated(): React.ReactElement {
  const router = useRouter();

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <HeaderDesktopLink onClick={() => { router.push(getCartLink()); }}>
            <ShoppingCartIcon />
          </HeaderDesktopLink>,
          <HeaderDesktopLink onClick={() => { router.push(getLoginLink()); }}>
            <LoginIcon />
          </HeaderDesktopLink>,
        ]}
        mobileMenu={[
          <HeaderMobileLink onClick={() => { router.push(getCartLink()); }}>
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink onClick={() => { router.push(getLoginLink()); }}>
            <LoginIcon />
            Login
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
