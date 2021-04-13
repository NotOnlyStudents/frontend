import React from 'react';
import Link from 'next/link';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface Props { }

interface State { }

function HeaderSeller() : React.ReactElement {
  return (
    <>
      <Link href="/personalArea">
        <ExitToAppIcon aria-label="logout" />
      </Link>
    </>
  );
}

export default HeaderSeller;
