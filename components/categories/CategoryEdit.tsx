import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Category, CategoryValidation } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';

interface Props {
  category?: Category;
  creation?: boolean;
  handleChangeCategory?: (editCategory: Category) => void,
  handleAddCategory?: (newCategory: Category) => void,
  handleCloseDialog: () => void
}

interface State {
  category: Category;
  error: CategoryValidation
}

class CategoryEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      category: props.category || '',
      error: {
        name: false,
      },
    };
  }

  setError = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.error[id] = error;

      return newState;
    });
  };

  handleChangeCategory = (category: Category) => {
    this.setState((state: State) => {
      const newState = state;

      newState.category = category;

      return newState;
    });
  };

  checkValidation = () => Object.values(this.state.error).every((val) => !val);

  handleClickSave = async () => {
    if (this.checkValidation()) {
      const { category } = this.state;

      const ps = new CategoryService();

      // if (category.id) {
      //   newCategory = await ps.editAddress(address.id, address);
      // } else {
      //   newCategory = await ps.createAddress(address);
      // }
      const newCategory = category;

      if (this.props.creation) {
        this.props.handleAddCategory(newCategory);
      } else {
        this.props.handleChangeCategory(newCategory);
      }
    }
  };

  render() {
    const { category, error } = this.state;
    const { creation, handleCloseDialog } = this.props;
    return (
      <Card>
        <CardHeader title={(creation) ? 'Add new category' : 'Edit your category'} />
        <CardContent>
          <TextFieldValidation
            id="name"
            label="Category name"
            placeholder="Insert category name"
            margin="normal"
            handleChange={this.handleChangeCategory}
            rules="required"
            value={category}
            error={error.name}
            setError={this.setError}
            helperText="Category name is required"
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
          >
            <HighlightOffIcon />
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickSave}
          >
            <CheckIcon />
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default CategoryEdit;
