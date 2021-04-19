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
    };


}

export default ComponentOrderFilter;