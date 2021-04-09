import React from 'react'
import Link from 'next/link';

interface Props { }

interface State { }

class HeaderSeller extends React.Component<Props, State>
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
                    <button type="button" name="personalArea">Your personal Area!</button>
                </Link>
            </>
        );
    }
}

export default HeaderSeller
