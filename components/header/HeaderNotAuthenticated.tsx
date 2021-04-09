import React from 'react'
import Link from 'next/link';

interface Props { }

interface State { }

class HeaderNotAuthenticated extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    render(): React.ReactElement
    {
        return (
            <>
                <Link href="/authenticator">
                    <button type="button" name="loginButton">Login!</button>
                </Link>
            </>
        );
    }
}

export default HeaderNotAuthenticated
