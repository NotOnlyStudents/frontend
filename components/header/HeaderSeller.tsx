import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddProductIcon from 'components/icons/AddProductIcon';
import PLPIcon from 'components/icons/PLPIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {
  getCategoriesLink, getHomeLink, getNewProductLink, getPersonalAreaLink, getPLPLink,
} from 'lib/links';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderSeller() : React.ReactElement {
  const router = useRouter();
  const { setSignedState } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      await router.push(getHomeLink(true));

      setSignedState(SignedState.NotAuthenticated);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <HeaderMenuMobile
        desktopMenu={[
          <HeaderDesktopLink href={getNewProductLink()}>
            <AddProductIcon aria-label="Add product" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink href={getPLPLink(true)}>
            <PLPIcon aria-label="Product list page" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink href={getCategoriesLink()}>
            <ListAltIcon aria-label="Categories" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink href={getPersonalAreaLink(true)}>
            <AccountCircleIcon aria-label="Your personal area" />
          </HeaderDesktopLink>,
          <HeaderDesktopLink onClick={handleSignOut}>
            <ExitToAppIcon aria-label="logout" />
          </HeaderDesktopLink>,
        ]}
        mobileMenu={[
          <HeaderMobileLink href={getNewProductLink()}>
            <AddProductIcon />
            Add product
          </HeaderMobileLink>,
          <HeaderMobileLink href={getPLPLink(true)}>
            <PLPIcon />
            Product List Page
          </HeaderMobileLink>,
          <HeaderMobileLink href={getCategoriesLink()}>
            <ListAltIcon />
            Categories
          </HeaderMobileLink>,
          <HeaderMobileLink href={getPersonalAreaLink(true)}>
            <AccountCircleIcon aria-label="Your personal area" />
            Personal Area
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

export default HeaderSeller;
