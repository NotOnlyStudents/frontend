import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddProductIcon from 'components/icons/AddProductIcon';
import PLPIcon from 'components/icons/PLPIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {
  getCategoriesLink, getNewProductLink, getPersonalAreaLink, getPLPLink,
} from 'lib/links';
import { signOut } from 'lib/authContext';
import HeaderMobileLink from './links/HeaderMobileLink';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderDesktopLink from './links/HeaderDesktopLink';

function HeaderSeller() : React.ReactElement {
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
          <HeaderDesktopLink onClick={signOut}>
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
          <HeaderMobileLink onClick={signOut}>
            <ExitToAppIcon aria-label="logout" />
            Logout
          </HeaderMobileLink>,
        ]}
      />
    </>
  );
}

export default HeaderSeller;
