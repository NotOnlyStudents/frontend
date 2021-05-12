import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { OrderFilter, SortOrderType } from 'interfaces/orders/orders';
import { Box, FormControlLabel } from '@material-ui/core';

interface Props {
    filter: OrderFilter;
    seller: boolean;
    handleChangeFilter: (filter: OrderFilter) => void;
}

function ComponentOrderFilter({ filter, seller, handleChangeFilter }: Props) {
    const handlChangeSort =  (sort: SortOrderType) => {
        const filterSort: OrderFilter = { ...filter };
        filterSort.sort = sort;
        handleChangeFilter(filterSort);
    };

    const handleChangeEmail = (email: string) => {
        const filterEmail: OrderFilter = { ...filter};
        filterEmail.email = email;
        handleChangeFilter(filterEmail);
    };

    const handleChangeStart = (start: string) => {
        
    }

    const handleChangeEnd = (end: string) => {
        
    }

    return (
      <Box p={2}>
          <Box display="flex">
        <TextfieldMinPrice
          selectedMinPrice={filter.priceMin}
          selectedMaxPrice={filter.priceMax}
          handleChangeMinPrice={handleChangeMinPrice}
        />
        <TextfieldMaxPrice
          selectedMaxPrice={filter.priceMax}
          selectedMinPrice={filter.priceMin}
          handleChangeMaxPrice={handleChangeMaxPrice}
        />
        <Box flexGrow={1} />
        <SortProducts
          sort={filter.sort}
          handleChangeSort={handleChangeSort}
        />
      </Box>
      </Box>  
    )
}

export default ComponentOrderFilter;
