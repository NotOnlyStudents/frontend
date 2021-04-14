import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';
import {Product} from '../../interfaces/product';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link,
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

interface Props {
  item: Product
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  image: {
    height: 50,
    width: 50
  },
});

//<Link to={this.props.item} onClick={item.quantity++}>Here</Link>

function CartItem({ item }: Props) {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardMedia className={classes.image}/>
          <Box flexDirection="column" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="button">
            { item.name }
          </Typography>
          <Typography variant="button">
            { item.quantity }
          </Typography>
          </Box>
          <Typography variant="button">
            { item.price }€
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button component={Link} size="small" color="primary" href={`/pdp/${item.id}`}>
            See more details
          </Button>
        </Box>
      </CardActions>
  
    </Card>
    
  );
}

export default CartItem;