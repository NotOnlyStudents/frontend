import React from 'react'
import Link from 'next/link';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface Props { }

interface State { }

class HeaderCustomer extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    render(): React.ReactElement
    {
        return (
            <>
                <Link href="/personalArea">
                    <AccountCircleIcon aria-label='Your personal area' />
                    <ExitToAppIcon aria-label="logout" />
                </Link>
            </>
        );
    }
}

export default HeaderCustomer
