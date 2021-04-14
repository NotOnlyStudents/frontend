import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';
import {Product} from '../../interfaces/product';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, Link, TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

interface Props {
  item: Product
}
/*
const useStyles = makeStyles(()=> createStyles({
  root: {
    width: '100%',
  },
  image: {
    height: 50,
    width: 50
  },
}));*/

//<Link to={this.props.item} onClick={item.quantity++}>Here</Link>

class CartItem extends React.Component<Props,any>{
  constructor(props){
    super(props);
  }



//Card Media da mettere dentro box per dimensione!
render(){
  //const classes = useStyles();
  const numbers =[
    {value:"1"},
    {value:"2"},
    {value:"3"},
    {value:"4"},
    {value:"5"},
    {value:"6"},
    {value:"7"},
    {value:"8"},
    {value:"9"},
    {value:"10"}
  ];

  const item= this.props.item;

  return (
    <Box width='60%'>
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardMedia image=""/>
          <Box flexDirection="column" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="button">
              { item.name }
            </Typography>
            <Autocomplete
              id="combo-box-demo"
              options={numbers}
              getOptionLabel={(option) => option.value}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
            <Button>
              Remove
            </Button>
          </Box>
          <Typography variant="button">
            { item.price }€
          </Typography>
      </Box>
        <Box display="flex" justifyContent="flex-end" width="100%">
          
        </Box>
    </Box>

);}}

export default CartItem;