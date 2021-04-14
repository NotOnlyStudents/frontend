import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';
import {Product} from '../../interfaces/product';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, CardActions, IconButton, InputLabel, Link, MenuItem, Select, TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

interface Props {
  item: Product
}

interface State{
  quantity: Number
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

class CartItem extends React.Component<Props,State>{
  constructor(props){
    super(props);  
    this.handleChange = this.handleChange.bind(this);
    this.state ={quantity: this.props.item.quantity};
  }

  handleChange = (event) => {
    event.preventDefault();
    const val = event.target.value;
    this.setState({quantity: val});
    this.props.item.quantity = val;
    console.log(this.props.item.quantity);
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
            <InputLabel>Quantity</InputLabel>
              <Select
                value={this.state.quantity}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            <Button>
              Remove Item
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