import LoginIcon from 'components/icons/LoginIcon';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getCartLink, getLoginLink } from 'lib/links';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderNotAuthenticated(): React.ReactElement {
  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <HeaderDesktopLink href={getCartLink()}>
            <ShoppingCartIcon />
          </HeaderDesktopLink>,
          <HeaderDesktopLink href={getLoginLink()}>
            <LoginIcon />
          </HeaderDesktopLink>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href={getCartLink()}>
            <ShoppingCartIcon />
            Cart
          </HeaderMobileLink>,
          <HeaderMobileLink href={getLoginLink()}>
            <LoginIcon />
            Login
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderNotAuthenticated;
