import Head from 'next/head';
import React from 'react';
import {
  Box, Button, InputAdornment, Snackbar, TextField, Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import ImagesUploader from 'components/images-uploader/ImagesUploader';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Product, ProductValidation } from 'interfaces/products/product';
import { Alert } from '@material-ui/lab';
import { NextRouter, withRouter } from 'next/router';
import ProductService from 'services/product-service';
import ProductServiceType from 'services/product-service/ProductService';

interface AlertState {
  validation: boolean
}

interface Props {
  router: NextRouter;
  product: Product;
}
interface State {
  product: Product;
  validation: ProductValidation;
  alert: AlertState;
}

class PDPEdit extends React.Component<Props, State> {
  readonly title: string = '';

  readonly imageLimit = 4;

  constructor(props: Props) {
    super(props);

    let product: Product;

    if (props.product) {
      this.title = `Editing ${props.product.name}`;
      product = {
        name: props.product.name,
        description: props.product.description,
        images: props.product.images,
        quantity: props.product.quantity,
        price: props.product.price,
        evidence: props.product.evidence || false,
        discount: props.product.discount !== null ? props.product.discount : 0,
        categories: props.product.categories,
      };
    } else {
      this.title = 'Creating new product';
      product = {
        name: '',
        description: '',
        images: [],
        quantity: 0,
        price: 1,
        evidence: false,
        discount: 0,
        categories: [],
      };
    }

    this.state = {
      product,
      validation: {
        name: false,
        images: false,
        quantity: false,
        price: false,
        discount: false,
        evidence: false,
        categories: false,
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

  handleChangeQuantity = (value: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.product.quantity = value;

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

  handleCloseAlertValidation = () => {
    this.setState({ alert: { validation: false } });
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

      router.push({
        pathname: `/pdp/${newProduct.id}`,
      });
    } else {
      this.setState({ alert: { validation: true } });
    }
  };

  render() {
    const { product, validation, alert } = this.state;

    return (
      <Box>
        <Head>
          <title>{`${this.title} | EmporioLambda`}</title>
        </Head>
        <Typography variant="h4" component="h2" noWrap>
          {this.title}
        </Typography>
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
        <ImagesUploader
          images={product.images}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          error={validation.images}
          disabled={this.reachedImageLimit()}
        />
        <Box
          position="absolute"
          display="flex"
          justifyContent="space-between"
          width="97%"
          bottom={15}
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
        <Snackbar open={alert.validation} autoHideDuration={4000}>
          <Alert severity="info">
            Not all fields satisfy the minimum requirements
          </Alert>
        </Snackbar>
      </Box>
    );
  }
}

export default withRouter(PDPEdit);
