import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Order } from 'interfaces/orders/orders';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Button, CardActions, IconButton, Link, CardActionArea
} from '@material-ui/core';
import { PLPProductItem } from 'interfaces/products/product';
//import { OrderItem } from 'interfaces/products/product';

interface Props {
    order: Order
}
const useStyles = makeStyles({
    root: {
        width: '100%',
      },
    image: {
        height: 100,
        position: 'relative',
        left: 0,
    },
    price: {
        textAlign: 'center',
        position: 'relative',
        right: 0, 
    },
});

//TODO Colore in base allo stato dell'ordine
function OrderProduct({ order }: Props) {
    const classes = useStyles();

    //const statoOrdine = (): React.ReactElement => (order.status? <Typography variant="h3" component="h2" noWrap> <p> Ordine evaso </p></Typography> : <Typography variant="h3" component="h2" noWrap> <p> Ordine non evaso </p></Typography> );

    const renderAllOrderItems = (): React.ReactElement[] => order.products.map(
        (item: PLPProductItem): React.ReactElement => (
            <Box position="relative" display="block">
                <CardMedia
                    className={classes.image}
                    image={item.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                        { item.name }
                    </Typography>
                    <Button component={Link} size="small" color="primary" href={`/pdp/${item.id}`}>
                        Vai alla pagina del prodotto
                    </Button>
                    <p>Quantità: </p>{ item.quantity }
                    <Box position="relative" display="flex" flexDirection="row" right={0}>
                        <p> Prezzo </p>
                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                            { item.price }
                        </Typography>
                    </Box>
                </CardContent> 
            </Box>   
        )
    )
    
    return (
        <Card className={classes.root}>
            <Box position="relative" display="block">
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography variant="h5" component="h2" noWrap>
                        { order.data } - { order.address }
                    </Typography>
                    <Typography variant="h5" component="h2" noWrap>
                        { order.id }
                    </Typography> 
                    <Typography variant="h5" component="h2" noWrap>
                        { order.status }
                    </Typography>
                    {/* <Typography variant="h5" component="h2" noWrap>
                        { order.price }
                    </Typography> */}
                </Box>
                {renderAllOrderItems()}
            </Box>
        </Card>
    );
}

export default OrderProduct;