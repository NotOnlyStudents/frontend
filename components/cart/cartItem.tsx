import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Product} from "interfaces/products/product";
import {
  Box, InputLabel, Link, MenuItem, Select,
} from '@material-ui/core';
import QuantityManager from 'components/quantity-manager/QuantityManager';
import { PersonalVideoSharp } from '@material-ui/icons';

interface Props {
  item: Product
  index: number
  handleChange: (event) => void
  handleRemove: (event) => void

}


//Dovrebbe diventare una funzione

export default function CartItem({item, index, handleChange, handleRemove}:Props) {
  var name = item.name;
  //name += item.available? "" :  " (Not available at the moment)";
  const [counter, setCounter] = React.useState(item.quantity);

  return (
    <Box width='60%'>
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardMedia >Immagine</CardMedia>
          <Box flexDirection="column" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="button">
              { item.name }
            </Typography>
            <InputLabel> Quantity </InputLabel>
            <Select
                name = {index.toString()}
                value={item.quantity}
                onChange={handleChange}
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
            <Link id={index.toString()} onClick={handleRemove}> Remove Item </Link>
          </Box>
          <Typography variant="button">
            { item.price * item.quantity }€
          </Typography>
      </Box>
    </Box>);
}
