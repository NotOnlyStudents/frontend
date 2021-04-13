import React from 'react';
import Link from 'next/link';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function HeaderCustomer() : React.ReactElement {
  return (
    <>
      <Link href="/personalArea">
        <AccountCircleIcon aria-label="Your personal area" />
        <ExitToAppIcon aria-label="logout" />
      </Link>
    </>
  );
}

export default HeaderCustomer;
