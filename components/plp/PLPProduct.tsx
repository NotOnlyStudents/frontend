import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { PLPProductItem } from 'interfaces/products/product';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    product: PLPProductItem
}

function PLPProduct({product}: Props) 
{
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.image}
                    image={product.image}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    { product.name }
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    image: {
        height: 50
    }
});

export default PLPProduct
