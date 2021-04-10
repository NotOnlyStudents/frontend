import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

import { ProductFilter } from "interfaces/products/product";
import { getCategories } from "services/productService";
import { Category } from "interfaces/products/category";
import { FormControlLabel } from "@material-ui/core";

interface Props {
  filter: ProductFilter;
  handleChangeFilter: (filter: ProductFilter) => void;
}

interface State {}

class PLPFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  async Categories() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<Category[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
      let active = true;

      if (!loading) {
        return undefined;
      }

      (async () => {
        const categories = await getCategories();
        if (active) {
          setOptions(
            Object.keys(categories).map(
              (key) => categories[key].item[0]
            ) as Category[]
          );
        }
      })();

      return () => {
        active = false;
      };
    }, [loading]);

    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    return (
      <Autocomplete
        multiple
        id="Categories"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  }

  Evidence() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "product in evidence" }}
          />
        }
        label="evidence"
      />
    );
  }

  render(): React.ReactElement {
    return (
      <>
        <>{this.Categories()}</>
        <>{this.Evidence()}</>
        <TextField
          id="minNumber"
          label="Minimum Price"
          type="number"
        />
        <TextField
          id="maxNumber"
          label="Maximum Price"
          type="number"
        />
      </>
    );
  }
}

export default PLPFilter;
