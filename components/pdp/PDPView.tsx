import {
  Box, Button, Chip, IconButton, Theme, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import QuantityManager from 'components/quantity/QuantityManager';
import { Category } from 'interfaces/categories/category';
import { Product } from 'interfaces/products/product';
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
  const router: NextRouter = useRouter();

  const [evidence, setEvidence] = React.useState(product.evidence);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [counter, setCounter] = React.useState(1);
  const [alert, setAlert] = React.useState({
    [changeQuantitySuccessId]: false,
    [changeQuantityErrorId]: false,

    [changeEvidenceSuccessId]: false,
    [changeEvidenceErrorId]: false,

    [addToCartSuccessId]: false,
    [addToCartErrorId]: false,
  });

  const changeAlert = (id: string, show: boolean) => {
    const newAlert = { ...alert };

    newAlert[id] = show;

    setAlert(newAlert);
  };

  const openAlert = (id: string) => {
    changeAlert(id, true);
  };
  const closeAlert = (id: string) => {
    changeAlert(id, false);
  };

  const handleClickEditButton = () => {
    router.push(`/seller/pdp/edit/${product.id}`);
  };

  const handleChangeEvidance = async (ev: boolean) => {
    try {
      console.log(ev);
      await (new ProductService()).editProduct(product.id, { ...product, evidence: ev });
      setEvidence(ev);
      openAlert(changeEvidenceSuccessId);
    } catch (error) {
      console.error(error);
      openAlert(changeEvidenceErrorId);
    }
  };

  const handleQuantityChange = async (q: number) => {
    try {
      await (new ProductService()).editProduct(product.id, { ...product, quantity: q });
      setQuantity(q);
      openAlert(changeQuantitySuccessId);
    } catch (error) {
      openAlert(changeQuantityErrorId);
    }
  };

  const handleAddToCart = async () => {
    openAlert(addToCartSuccessId);
  };

  const renderEditOptionsIfSeller = () => (edit ? (
    <Box display="flex">
      <IconButton color="primary" onClick={handleClickEditButton}>
        <Edit />
      </IconButton>
      <PDPEvidence
        evidence={evidence}
        handleChangeEvidence={handleChangeEvidance}
      />
      <PDPRemove
        id={product.id}
        productName={product.name}
      />
    </Box>
  ) : <></>);

  const renderCategories = () : React.ReactElement[] => product.categories.map(
    (category: Category) : React.ReactElement => (
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
        <Typography variant="h5" component="h3">
          Description
        </Typography>
        <Typography>
          {product.description}
        </Typography>
      </Box>

      <SnackbarChangeQuantitySuccess
        open={alert[changeQuantitySuccessId]}
        handleClose={closeAlert}
      />

      <SnackbarChangeQuantityError
        open={alert[changeQuantityErrorId]}
        handleClose={closeAlert}
      />

      <SnackbarChangeEvidenceSuccess
        open={alert[changeEvidenceSuccessId]}
        handleClose={closeAlert}
      />

      <SnackbarChangeEvidenceError
        open={alert[changeEvidenceErrorId]}
        handleClose={closeAlert}
      />

      <SnackbarAddToCartSuccess
        productName={product.name}
        open={alert[addToCartSuccessId]}
        handleClose={closeAlert}
      />

      <SnackbarAddToCartError
        productName={product.name}
        open={alert[addToCartErrorId]}
        handleClose={closeAlert}
      />
    </>
  );
}

export default PDPView;
