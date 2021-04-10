import React from 'react'

import { PLPProductItem, ProductFilter} from 'interfaces/products/product';
import PLPProduct from 'components/plp/PLPProduct';
import { getAllProduct } from 'services/productService';
import { Box, Grid, GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import PLPFilter from 'components/plp/PLPFilter';

interface Props {
    filters: ProductFilter,
    products: PLPProductItem[]
}

interface State {
    filters: ProductFilter,
    products: PLPProductItem[]
}

class PLPCustomer extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            filters: {},
            products: []
        }
    }

    componentDidMount()
    {
        this.setState({ 
            filters: this.props.filters, 
            products: this.props.products
        });
    }

    handleChangeFilters = (filters: ProductFilter) => {
        
        this.setState({ filters })
    }

    handleChangePagination = (value: number) => {
        this.setState({filters: { page: value }})
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
        const { filters } = this.state;

        return (
            <>
                <PLPFilter 
                    filter={filters} 
                    handleChangeFilter={this.handleChangeFilters} 
                />
                <Grid container spacing={3} justify='center' alignItems='center'>
                    {this.renderAllItems()}
                </Grid>
                <div>
                    <Pagination count={10} page={filters.page} onChange={this.handleChangePagination} />
                </div>
            </>
        );
    }
}

export async function getServerSideProps({query}) {
    const filters: ProductFilter = query;

    return {
        props: {
            filters,
            products: await getAllProduct(filters)
        }
    }
}

export default PLPCustomer;
