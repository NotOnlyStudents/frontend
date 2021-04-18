import {
  Box, InputBase, MenuItem, Select, Theme,
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';
import { SortType } from 'interfaces/products/product';
import React from 'react';

const BootstrapInput = withStyles((theme: Theme) => createStyles({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

interface Props {
  sort: SortType;
  handleChangeSort: (sort: SortType) => void
}

function SortProducts({
  sort, handleChangeSort,
}: Props) : React.ReactElement {
  const onChangeSort = (event) => {
    handleChangeSort(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <Select
        id="sort-products"
        labelId="sort-products-label"
        value={sort}
        onChange={onChangeSort}
        input={<BootstrapInput />}
      >
        <MenuItem value={SortType.alphabetical}>Alphabetical</MenuItem>
        <MenuItem value={SortType.cheaper}>Cheaper</MenuItem>
        <MenuItem value={SortType.expensive}>Expensive</MenuItem>
      </Select>
    </Box>
  );
}

export default SortProducts;
