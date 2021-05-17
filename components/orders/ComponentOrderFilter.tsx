import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { OrderFilter, SortOrderType } from 'interfaces/orders/orders';
import { Box, FormControlLabel } from '@material-ui/core';
import TextfieldStartDate from 'components/textfield/textfieldStartDate';
import TextfieldMaxPrice from 'components/textfield/textfieldMaxPrice';
import SortProducts from 'components/sort-products/SortProducts';
import TextfieldEndDate from 'components/textfield/textfieldEndDate';

interface Props {
    filter: OrderFilter;
    seller: boolean;
    handleChangeFilter: (filter: OrderFilter) => void;
}

function ComponentOrderFilter({ filter, seller, handleChangeFilter }: Props) {
    const handleChangeSort =  (sort: SortOrderType) => {
        const filterSort: OrderFilter = { ...filter };
        filterSort.sort = sort;
        handleChangeFilter(filterSort);
    };

    const handleChangeEmail = (email: string) => {
        const filterEmail: OrderFilter = { ...filter};
        filterEmail.email = email;
        handleChangeFilter(filterEmail);
    };

    const handleChangeStart = (start: Date) => {
      const filterStartDate: OrderFilter = { ...filter };
      filterStartDate.start = start.toISOString();
      handleChangeFilter(filterStartDate);
    }

    const handleChangeEnd = (end: Date) => {
      const filterEndDate: OrderFilter = { ...filter };
      filterEndDate.end = end.toISOString();
      handleChangeFilter(filterEndDate);
    }

    return (
      <Box p={2}>
          <Box display="flex">
            <TextfieldStartDate
              selectedStartDate={filter.start}
              selectedEndDate={filter.end}
              handleChangeStart={handleChangeStart}
            />
            <TextfieldEndDate
              selectedEndDate={filter.end}
              selectedEndDate={filter.start}
              selectedEndDate={handleChangeEnd}
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
