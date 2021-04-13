import {
  Box, Button, CardMedia, Chip, Theme, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import QuantityManager from 'components/quantity-manager/QuantityManager';
import { Category } from 'interfaces/products/category';
import { Product } from 'interfaces/products/product';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import React from 'react';

interface Props {
  product: Product,
  edit?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: '0.5rem 2rem',
  },
  container: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  sideImg: {
    width: '10em',
    height: '10em',
  },
  selectedImg: {
    width: '95%',
    height: '100%',
  },
  containerImages: {
    marginBottom: theme.spacing(4),
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  containerCartCategories: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

function PDPView({ product, edit }: Props) : React.ReactElement {
  const classes = useStyles();

  const [counter, setCounter] = React.useState(1);

  const [actualImg, setActualImg] = React.useState(product.images[0]);

  const renderImages = () : React.ReactElement[] => product.images
    .filter((image: string) => image !== actualImg)
    .map((image: string) : React.ReactElement => (
      <CardMedia
        key={image}
        className={classes.sideImg}
        image={image}
        onClick={setActualImg.bind(this, image)}
      />
    ));

  const renderCategories = () : React.ReactElement[] => product.categories.map(
    (category: Category) : React.ReactElement => (
      <Chip
        key={category.name}
        className={classes.chip}
        label={category.name}
      />
    ),
  );

  return (
    <Box>
      <Typography variant="h4" component="h2">
        { product.name }
      </Typography>
      <Box className={classes.container} display="flex">
        <Box className={classes.containerImages} display="flex" height="35em">
          <Box
            display="flex"
            height="100%"
            width="10em"
            flexDirection="column"
            justifyContent="space-between"
          >
            {renderImages()}
          </Box>
          <Box display="flex" width="100%" justifyContent="center" alignItems="center">
            <CardMedia className={classes.selectedImg} image={actualImg} />
          </Box>
        </Box>
        <Box className={classes.containerCartCategories}>
          <Typography variant="h5" component="h3">
            Add to cart
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography>
              {product.price}
            </Typography>
            <Box display="flex" flexGrow={1} />
            <QuantityManager counter={counter} handleCounterChange={setCounter} />
            <Button
              variant="contained"
              color="primary"
            >
              <AddShoppingCartIcon />
            </Button>
          </Box>
          <Typography variant="h5" component="h3">
            Categories
          </Typography>
          <Box display="flex" flexWrap="wrap">
            { renderCategories() }
          </Box>
        </Box>
      </Box>
      <Typography variant="h5" component="h3">
        Description
      </Typography>
      <Typography>
        {product.description}
      </Typography>
    </Box>
  );
}

export default PDPView;
