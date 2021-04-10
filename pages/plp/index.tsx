import React from 'react'

import { PLPProductItem, ProductFilter} from 'interfaces/products/product';
import PLPProduct from 'components/plp/PLPProduct';
import { getAllProduct } from 'services/productService';
import { Box, GridList } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {  } from '@material-ui/core/styles';

interface Props {
    classes,
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
        console.log(this.state.products)

        return (
            <>
                {/* <PLPFilter 
                    filter={this.state.filter} 
                    handleChangeFilter={this.handleChangeFilters} 
                /> */}
                <GridList cellHeight={180} className={classes.gridList}>
                    {this.renderAllItems()}
                </GridList>
            </>
        );
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

export async function getServerSideProps({query}) {
    const filter: ProductFilter = query;

    return {
        props: {
            filter: filter,
            products: await getAllProduct(filter)
        }
    }
}

export default withStyles(useStyles)(PLPCustomer);
