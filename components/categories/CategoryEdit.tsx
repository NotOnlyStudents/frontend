import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { Category, CategoryValidation } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';
import CategoryServiceType from 'services/category-service/CategoryService';

interface Props {
  category?: Category;
  creation?: boolean;
  handleChangeCategory?: () => void,
  handleAddCategory?: () => void,
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
      category: props.category || { name: '' },
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

  handleChangeCategoryName = (name: string) => {
    this.setState((state: State) => {
      const newState = state;

      newState.category.name = name;

      return newState;
    });
  };

  checkValidation = () => Object.values(this.state.error).every((val) => !val);

  handleClickSave = async () => {
    if (this.checkValidation()) {
      const { category } = this.state;
      const { creation } = this.props;

      const cs: CategoryServiceType = new CategoryService();

      if (creation) {
        await cs.addCategory(category);
        this.props.handleAddCategory();
      } else {
        await cs.editCategory(category.id, category);
        this.props.handleChangeCategory();
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
            handleChange={this.handleChangeCategoryName}
            rules="required"
            value={category.name}
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
