import {
  Box, Button, Chip, IconButton, Theme, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import QuantityManager from 'components/quantity/QuantityManager';
import { Category } from 'interfaces/categories/category';
import { CartProduct, Product } from 'interfaces/products/product';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import React from 'react';
import { Edit } from '@material-ui/icons';
import { NextRouter, useRouter } from 'next/router';
import PriceItem from 'components/price-item/PriceItem';
import FillQuantity from 'components/quantity/FillQuantity';
import ImageSwitcher from 'components/image-switcher/ImageSwitcher';
import SnackbarChangeEvidenceSuccess, { changeEvidenceSuccessId } from 'components/snackbar/evidence/SnackbarChangeEvidenceSuccess';
import SnackbarChangeEvidenceError, { changeEvidenceErrorId } from 'components/snackbar/evidence/SnackbarChangeEvidenceError';
import SnackbarChangeQuantityError, { changeQuantityErrorId } from 'components/snackbar/quantity/SnackbarChangeQuantityError';
import SnackbarChangeQuantitySuccess, { changeQuantitySuccessId } from 'components/snackbar/quantity/SnackbarChangeQuantitySuccess';
import SnackbarAddToCartSuccess, { addToCartSuccessId } from 'components/snackbar/cart/SnackbarAddToCartSuccess';
import SnackbarAddToCartError, { addToCartErrorId } from 'components/snackbar/cart/SnackbarAddToCartError';
import ProductService from 'services/product-service';
import { getEditProductLink } from 'lib/links';
import { Auth } from 'aws-amplify';
import CartService from 'services/cart-service';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';
import PDPRemove from './PDPRemove';
import PDPEvidence from './PDPEvidence';

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
  containerCartCategories: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

function PDPView({ product, edit }: Props) : React.ReactElement {
  const classes = useStyles();

  const { openSnackbar } = useSnackbarContext();

  const [evidence, setEvidence] = React.useState(product.evidence);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [counter, setCounter] = React.useState(1);

  const checkQuantityProductInCart = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const products: CartProduct[] = await (new CartService()).getCartProducts(token);

      const addedQuantity = products
        .filter((p: CartProduct) => p.id === product.id)
        .map((p: CartProduct) => (p.quantity));

      if (addedQuantity.length) {
        setCounter(addedQuantity[0]);
      }
    } catch (error) {
      openSnackbar(Snackbars.errorRetrievingDataId);
    }
  };

  React.useEffect(() => {
    checkQuantityProductInCart();
  }, []);

  const handleChangeEvidance = async (ev: boolean) => {
    try {
      await (new ProductService()).editProduct(product.id, { ...product, evidence: ev });
      setEvidence(ev);
      openSnackbar(Snackbars.changeEvidenceSuccessId);
    } catch (error) {
      openSnackbar(Snackbars.changeEvidenceErrorId);
    }
  };

  const handleQuantityChange = async (q: number) => {
    try {
      await (new ProductService()).editProduct(product.id, { ...product, quantity: q });
      setQuantity(q);
      openSnackbar(Snackbars.changeQuantitySuccessId);
    } catch (error) {
      openSnackbar(Snackbars.changeQuantityErrorId);
    }
  };

  const handleAddToCart = async () => {
    const productToCart = await new ProductService().getProductById(product.id);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      await new CartService().postCartProducts(token, { ...productToCart, quantity: counter });
      openSnackbar(Snackbars.addToCartSuccessId);
    } catch (error) {
      openSnackbar(Snackbars.addToCartErrorId);
    }
  };

  const renderEditOptionsIfSeller = () => (edit ? (
    <Box display="flex">
      <IconButton color="primary" href={getEditProductLink(product.id)}>
        <Edit />
      </IconButton>
      <PDPEvidence
        evidence={evidence}
        handleChangeEvidence={handleChangeEvidance}
      />
      <PDPRemove
        id={product.id}
      />
    </Box>
  ) : <></>);

  const renderCategories = () : React.ReactElement[] => product.categories.map(
    (category: string) : React.ReactElement => (
      <Chip
        key={category}
        className={classes.chip}
        label={category}
      />
    ),
  );

  const renderQuantity = () => (
    edit
      ? (
        <FillQuantity
          quantity={quantity as number}
          handleCounterChange={handleQuantityChange}
        />
      )
      : (
        <>
          <QuantityManager
            counter={counter}
            handleCounterChange={setCounter}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon />
          </Button>
        </>
      )
  );

  const renderDescriptionIfExist = () => (
    product.description
      ? (
        <>
          <Typography variant="h5" component="h3">
            Description
          </Typography>
          <Typography>
            {product.description}
          </Typography>
        </>
      )
      : <></>
  );

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h2" noWrap>
            { product.name }
          </Typography>
          { renderEditOptionsIfSeller() }
        </Box>
        <Box className={classes.container} display="flex">
          <ImageSwitcher images={product.images} />
          <Box className={classes.containerCartCategories}>
            <Typography variant="h5" component="h3">
              Add to cart
            </Typography>
            <Box display="flex" alignItems="center">
              <PriceItem
                price={product.price}
                discount={product.discount}
                discountedPrice={product.discountedPrice}
              />
              <Box display="flex" flexGrow={1} />
              { renderQuantity() }
            </Box>
            <Typography variant="h5" component="h3">
              Categories
            </Typography>
            <Box display="flex" flexWrap="wrap">
              { renderCategories() }
            </Box>
          </Box>
        </Box>
        { renderDescriptionIfExist() }
      </Box>
    </>
  );
}

export default PDPView;
