import {
  Box, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import ImagesUploader from 'components/images-uploader/ImagesUploader';
import { Product } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import * as Validator from 'validatorjs';

interface Props {
  product: Product;
}
interface State {
  product: Product;
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
    };
  }

  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rules = {
      value: 'required|max:100',
    };

    this.setState((state: State) => {
      const newState = state;

      const validation = new Validator(event.target, rules);

      if (validation.passes()) {
        newState.product.name = event.target.value;
      } else {
        newState.validation.
      }

      return { product };
    });
  };

  handleAddImage = (event: Event) => {
    if (!this.reachedImageLimit()) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.setState((state: State) => {
          const { product } = state;

          product.images.push(reader.result as string);

          return { product };
        });
      };
    }
  };

  handleRemoveImage = (image: string) => {
    this.setState((state: State) => {
      const { product } = state;

      product.images.splice(product.images.indexOf(image), 1);

      return { product };
    });
  };

  reachedImageLimit = () => this.state.product.images.length === this.imageLimit;

  render() {
    const { product } = this.state;

    return (
      <Box>
        <Head>
          <title>{`${this.title} | EmporioLambda`}</title>
        </Head>
        <Typography variant="h4" component="h2" noWrap>
          {this.title}
        </Typography>
        <TextField
          id="product-name"
          label="Product name"
          placeholder="Insert product name"
          helperText="Full width!"
          defaultValue={product.name}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="product-description"
          label="Product description"
          placeholder="Insert product description"
          defaultValue={product.description}
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="product-price"
          label="Product price"
          placeholder="Insert product price"
          defaultValue={product.price}
          type="number"
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="product-price"
          label="Product quantity"
          placeholder="Insert product quantity"
          defaultValue={product.quantity}
          type="number"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ImagesUploader
          images={product.images}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          disabled={this.reachedImageLimit()}
        />
      </Box>
    );
  }
}

export default PDPEdit;
