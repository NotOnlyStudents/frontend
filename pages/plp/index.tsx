import React from 'react'

import { PLPProductItem, ProductFilter} from 'interfaces/products/product';
import PLPProduct from 'components/plp/PLPProduct';
import { getAllProduct } from 'services/productService';

interface Props {
    filter: ProductFilter,
    products: PLPProductItem[]
}

interface State {
    filter: ProductFilter,
    products: PLPProductItem[]
}

class PLPCustomer extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            filter: {},
            products: []
        }
    }

    componentDidMount()
    {
        console.log(this.props);

        this.setState({ 
            filter: this.props.filter, 
            products: this.props.products
        });
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
                {/* <PLPFilter 
                    filter={this.state.filter} 
                    handleChangeFilter={this.handleChangeFilters} 
                />
                <Box flexWrap="wrap">
                    {this.renderAllItems()}
                </Box> */}
            </div>
        );
    }
}

export async function getServerSideProps({query}) {
    const filter: ProductFilter = query;

    return {
        props: {
            filter: filter,
            products: await getAllProduct(filter)
        }
    }
}

export default PLPCustomer
