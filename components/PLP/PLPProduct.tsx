import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { PLPProductItem } from 'interfaces/products/product';

// import './PLPProduct.scss'

interface Props {
    product: PLPProductItem
}
interface State {}

class PLPProduct extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    render(): React.ReactElement
    {
        const {product} = this.props;

        return (
            <Card className="plp_product">
                <CardActionArea>
                    <CardMedia
                        className="plp_product-image"
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
}

export default PLPProduct
