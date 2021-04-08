import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import Box from '@material-ui/core/Box';

import { PLPProductItem, ProductFilter} from 'interfaces/products/product';
import PLPProduct from 'components/PLP/PLPProduct';
import PLPFilter from 'components/PLP/PLPFilter';

interface Props {}

interface State {
    filter: ProductFilter,
    products: PLPProductItem[]
}

class PLPCustomer extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.initFilter();
    }

    initFilter = () => {
        const router: NextRouter = useRouter();

        const filter: ProductFilter = {
            name: router.query.name as string || "",
            categories: router.query.categories as string[],
            available: JSON.parse(router.query.available as string) as boolean,
            priceMax: parseFloat(router.query.priceMax as string),
            priceMin: parseFloat(router.query.priceMin as string)
        };

        this.setState({ filter });
    }

    handleChangeFilters = (filter: ProductFilter) => {
        this.setState({ filter })
    }

    renderAllItems(): React.ReactElement[]
    {
        return this.state.products.map(
            (product: PLPProductItem, index: number): React.ReactElement => {
                return (
                    <PLPProduct key={index} product={product} />
                );
            }
        );
    }

    render(): React.ReactElement
    {
        return (
            <div>
                <PLPFilter 
                    filter={this.state.filter} 
                    handleChangeFilter={this.handleChangeFilters} 
                />
                <Box flexWrap="wrap">
                    {this.renderAllItems()}
                </Box>
            </div>
        );
    }
}

export default PLPCustomer
