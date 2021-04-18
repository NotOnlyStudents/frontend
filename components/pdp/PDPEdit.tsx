import Head from 'next/head';
import React from 'react';
import {
  Box, Button, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import ImagesUploader from 'components/images-uploader/ImagesUploader';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Product, ProductValidation } from 'interfaces/products/product';
import { NextRouter, withRouter } from 'next/router';
import ProductService from 'services/product-service';
import ProductServiceType from 'services/product-service/ProductService';
import AutocompleteCategories from 'components/autocomplete/autocompleteCategories';
import { Category } from 'interfaces/categories/category';
import EMLSnackbar from 'components/snackbar/EMLSnackbar';
import PDPEvidence from './PDPEvidence';

interface AlertState {
  validation: boolean
}

interface Props {
  router: NextRouter;
  product: Product;
  title: string;
  creation?: boolean;
}
interface State {
  product: Product;
  validation: ProductValidation;
  alert: AlertState;
}

class PDPEdit extends React.Component<Props, State> {
  readonly imageLimit = 4;

  constructor(props: Props) {
    super(props);

    this.state = {
      product: props.product,
      validation: {
        name: false,
        images: false,
        quantity: false,
        price: false,
        discount: false,
        evidence: false,
      },
      alert: { validation: false },
    };
  }

  handleChangeName = (value: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.name = value;

      return newState;
    });
  };

  handleChangeEvidence = async (evidence: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.evidence = evidence;

      return newState;
    });
  };

  handleChangePrice = (value: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.price = value;

      return newState;
    });
  };

  handleChangeDescription = (event: React.ChangeEvent<Element>) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.description = event.target.value;

      return newState;
    });
  };

  handleChangeQuantity = (value: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.quantity = value;

      return newState;
    });
  };

  handleChangeCategories = (categories: Category[]) => {
    this.setState((state: State) => {
      const newState = state;
      newState.product.categories = categories;
      return newState;
    });
  };

  handleChangeDiscount = (discount: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.discount = discount;

      return newState;
    });
  };

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.validation[id] = error;

      return newState;
    });
  };

  handleAddImage = (event: Event) => {
    if (!this.reachedImageLimit()) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.setState((state: State) => {
          const newState = state;

          newState.product.images.push(reader.result as string);

          newState.validation.images = newState.product.images.length === 0;

          return newState;
        });
      };
    }
  };

  handleRemoveImage = (image: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.images.splice(newState.product.images.indexOf(image), 1);
      newState.validation.images = newState.product.images.length === 0;

      return newState;
    });
  };

  reachedImageLimit = () => this.state.product.images.length === this.imageLimit;

  checkValidation = () => {
    const { validation } = this.state;

    return Object.values(validation).every(
      (val: boolean) => (!val),
    );
  };

  handleCloseAlert = (id: string) => {
    this.setState((state: State) => {
      const newState: State = state;

      newState.alert[id] = false;

      return newState;
    });
  };

  handleClickCancel = () => {
    const { router } = this.props;

    router.back();
  };

  handleClickSave = async () => {
    if (this.checkValidation()) {
      const { router } = this.props;
      const { product } = this.state;
      let newProduct: Product;

      const ps: ProductServiceType = new ProductService();

      if (product.id) {
        newProduct = await ps.editProduct(product.id, product);
      } else {
        newProduct = await ps.createProduct(product);
      }

      // router.push({
      //   pathname: `/pdp/${newProduct.id}`,
      // });
    } else {
      this.setState({ alert: { validation: true } });
      setTimeout(() => { this.setState({ alert: { validation: false } }); }, 4000);
    }
  };

  render() {
    const { title, creation } = this.props;
    const { product, validation, alert } = this.state;

    const renderEvidence = () => (creation ? (
      <PDPEvidence
        evidence={product.evidence}
        handleChangeEvidence={this.handleChangeEvidence}
      />
    ) : <></>);

    return (
      <Box>
        <Head>
          <title>{`${title} | EmporioLambda`}</title>
        </Head>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          { renderEvidence() }
        </Box>
        <TextFieldValidation
          id="name"
          label="Product name"
          placeholder="Insert product name"
          helperText="Full width!"
          value={product.name}
          fullWidth
          margin="normal"
          handleChange={this.handleChangeName}
          setError={this.setError}
          error={validation.name}
          rules="required|max:100"
        />
        <TextField
          id="description"
          label="Product description"
          placeholder="Insert product description"
          value={product.description}
          fullWidth
          multiline
          margin="normal"
          onChange={this.handleChangeDescription}
        />
        <AutocompleteCategories
          selectedCategories={product.categories}
          handleChangeCategories={this.handleChangeCategories}
        />
        <Box display="flex" justifyContent="space-between">
          <TextFieldValidation
            id="price"
            label="Product price"
            placeholder="Insert product price"
            value={product.price}
            type="number"
            margin="normal"
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            error={validation.price}
            setError={this.setError}
            handleChange={this.handleChangePrice}
            rules="required|numeric|min:0"
          />
          <TextFieldValidation
            id="quantity"
            label="Product quantity"
            placeholder="Insert product quantity"
            value={product.quantity}
            type="number"
            margin="normal"
            error={validation.quantity}
            setError={this.setError}
            handleChange={this.handleChangeQuantity}
            rules="required|integer"
          />
          <TextFieldValidation
            id="discount"
            label="Product discount"
            placeholder="Insert product discount"
            value={product.discount}
            type="number"
            margin="normal"
            error={validation.discount}
            setError={this.setError}
            handleChange={this.handleChangeDiscount}
            rules="integer|min:0|max:100"
          />
        </Box>
        <ImagesUploader
          images={product.images}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          error={validation.images}
          disabled={this.reachedImageLimit()}
        />
        <Box
          position="relative"
          display="flex"
          marginTop={10}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickCancel}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </Box>
        <EMLSnackbar
          id="validation"
          open={alert.validation}
          severity="info"
          duration={4000}
          handleClose={this.handleCloseAlert}
        >
          Some field doesn't satisfy the minimal requirements
        </EMLSnackbar>
      </Box>
    );
  }
}

export default withRouter(PDPEdit);
