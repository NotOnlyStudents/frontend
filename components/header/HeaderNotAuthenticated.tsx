import React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';

function HeaderNotAuthenticated() : React.ReactElement {
  return (
    <>
      <Link href="/authenticator">
        <Button variant="contained" color="secondary">Login!</Button>
      </Link>
    </>
  );
}

export default HeaderNotAuthenticated;
