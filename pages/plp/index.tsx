import React, { ChangeEvent } from 'react'

import { PLPProductItem, ProductFilter} from 'interfaces/products/product';
import PLPProduct from 'components/plp/PLPProduct';
import { getAllProduct } from 'services/productService';
import { Grid } from '@material-ui/core';
import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';

interface Props {
    filters: ProductFilter,
    products: PLPProductItem[],
    totalProducts: number
}

interface State {
    filters: ProductFilter,
    products: PLPProductItem[],
    totalProducts: number
}

class PLPCustomer extends React.Component<Props, State>
{
    private static limit = 25; 

    constructor(props: Props)
    {
        super(props);

        this.state = {
            filters: {},
            products: [],
            totalProducts: 0
        }
    }

    componentDidMount()
    {
        this.setState({ ...this.props });
    }

    handleChangeFilters = (filters: ProductFilter) => {
        
        this.setState({ filters })
    }

    handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
        this.setState({filters: { offset: value }})
    };

    renderAllItems(): React.ReactElement[]
    {
        return this.state.products.map(
            (product: PLPProductItem, index: number): React.ReactElement => {
                return (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <PLPProduct product={product} />
                    </Grid>
                );
            }
        );
    }

    render(): React.ReactElement
    {
        const { filters, totalProducts } = this.state;

        return (
            <>
                {/* <PLPFilter 
                    filter={filters} 
                    handleChangeFilter={this.handleChangeFilters} 
                /> */}
                <Grid container spacing={3} justify='center' alignItems='center'>
                    {this.renderAllItems()}
                </Grid>
                <EMLPagination 
                    totalElements={totalProducts}
                    limit={PLPCustomer.limit}
                    page={filters.offset}
                    handleChangePagination={this.handleChangePagination}
                    />
            </>
        );
    }
}

export async function getServerSideProps({query}) {
    const filters: ProductFilter = query;

    const products = await getAllProduct(filters);

    return {
        props: {
            filters,
            products,
            totalProducts: 250
        }
    }
}

export default PLPCustomer;
