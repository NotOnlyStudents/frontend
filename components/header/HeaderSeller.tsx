import React from 'react';
import Link from 'next/link';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface Props { }

interface State { }

class HeaderSeller extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactElement {
    return (
      <>
        <Link href="/personalArea">
          <ExitToAppIcon aria-label="logout" />
        </Link>
      </>
    );
  }
}

export default HeaderSeller;
