import React from 'react';
import CategoryView from 'components/categories/CategoryView';

interface Props {
  categories:string[]
}

interface State{
  categories?:string[],
  newCategoryName?: string,
  categoryNewName?: string
}

class CategoriesList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
      newCategoryName: '',
      categoryNewName: '',
    };
  }

  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleAdd = (event) => {
    const newCategories = this.state.categories;
    newCategories.push(this.state.newCategoryName);
    this.setState({ categories: newCategories, selectedCategory: newCategories[0], newCategoryName: '' });
    alert('Category added with success!');
  };

  renameCategory = (event) => {
    event.preventDefault;
    const { categories } = this.state;
    const index = categories.indexOf(this.state.selectedCategory);
    categories[index] = this.state.categoryNewName;
    const voidString = '';
    this.setState({ categories, selectedCategory: categories[0], categoryNewName: '' });
    alert('Category renamed with success!');
  };

  deleteCategory = (event) => {
    if (this.state.categories.length != 1) {
      const cat = this.state.categories;
      const filtered = cat.filter((value, index, cat) => value != toRemove);
      this.setState({ categories: filtered, selectedCategory: filtered[0] });
    }
  };

  renderItems = (): React.ReactElement[] => this.state.categories.map(
    (category: string, index: number): React.ReactElement => (
      <CategoryView
        key={category}
        category={category}
        index={index}
      />
    ),
  );

  render(): React.ReactElement {
    return (
      <>
        {this.renderItems()}
      </>
    );
  }
}

export default CategoriesList;
