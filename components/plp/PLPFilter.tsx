import React from 'react'

import { ProductFilter } from 'interfaces/products/product';

interface Props {
    filter: ProductFilter,
    handleChangeFilter: (filter: ProductFilter) => void
}

interface State {}

class PLPFilter extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    render(): React.ReactElement
    {
        return (
            <div>
                <Autocomplete>
            </div>
        );
    }
}

export default PLPFilter
