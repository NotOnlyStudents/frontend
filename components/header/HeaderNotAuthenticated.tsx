import React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';

interface Props { }

interface State { }

class HeaderNotAuthenticated extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactElement {
    return (
      <>
        <Link href="/authenticator">
          <Button variant="contained" color="secondary">Login!</Button>
        </Link>
      </>
    );
  }
}

export default HeaderNotAuthenticated;
