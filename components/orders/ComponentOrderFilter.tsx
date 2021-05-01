import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { OrderFilter, SortOrderType } from 'interfaces/orders/orders';
import { FormControlLabel } from '@material-ui/core';

interface Props {
    filter: OrderFilter;
    handleChangeFilter: (filter: OrderFilter) => void;
}

function ComponentOrderFilter({ filter, handleChangeFilter }: Props) {
    const handlChangeSort =  (sort: SortOrderType) => {
        const filterSort: OrderFilter = { ...filter };
        filterSort.sort = sort;
        handleChangeFilter(filterSort);
    };

    const handleChangeMinData = (minData: string) => {
        if()
    };
}

export default ComponentOrderFilter;