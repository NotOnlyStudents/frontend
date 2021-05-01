<<<<<<< HEAD
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
=======
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { OrderFilter } from 'interfaces/products/product';
import { FormControlLabel } from '@material-ui/core';

interface Props {
  filter: OrderFilter;
  handleChangeFilter: (filter: OrderFilter) => void;
}

class ComponentOrderFilter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
}

export default ComponentOrderFilter;
>>>>>>> 2f0f789a5e5f6dd16636d186ad4e46f42cb942c8
