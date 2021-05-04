import React from 'react';
import CategoryView from 'components/categories/CategoryView';
import { Category } from 'interfaces/categories/category';
import { Box, Button, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CategoryEdit from './CategoryEdit';

interface Props {
  categories: Category[]
}

interface State{
  categories: Category[],
  openNew: boolean
}

class CategoriesList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      openNew: false,
    };
  }

  handleAddCategory = (newCategory: Category) => {
    this.setState((state: State) => {
      const newState = state;

      newState.categories.push(newCategory);
      newState.openNew = false;

      return newState;
    });
  };

  handleChangeCategory = (editCategory: Category, index: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.categories[index] = editCategory;

      return newState;
    });
  };

  handleRemoveCategory = (index: number) => {
    this.setState((state: State) => {
      const newState = state;

      newState.categories.splice(index, 1);

      return newState;
    });
  };

  handleClickNewCategory = () => {
    this.setState({ openNew: true });
  };

  handleCloseNewCategoryDialog = () => {
    this.setState({ openNew: false });
  };

  renderItems = (): React.ReactElement[] => this.state.categories.map(
    (category: string, index: number): React.ReactElement => (
      <CategoryView
        key={category}
        category={category}
        index={index}
        handleRemoveCategory={this.handleRemoveCategory}
        handleChangeCategory={this.handleChangeCategory}
      />
    ),
  );

  render(): React.ReactElement {
    const { openNew } = this.state;

    return (
      <>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={this.handleClickNewCategory}
            variant="contained"
            color="primary"
          >
            <AddIcon />
            Add a new category
          </Button>
        </Box>
        {this.renderItems()}
        <Dialog open={openNew} onClose={this.handleCloseNewCategoryDialog}>
          <CategoryEdit
            handleAddCategory={this.handleAddCategory}
            handleCloseDialog={this.handleCloseNewCategoryDialog}
            creation
          />
        </Dialog>
      </>
    );
  }
}

export default CategoriesList;
