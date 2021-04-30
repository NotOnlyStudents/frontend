import { Box, Button, TextField, Typography, Fab, Input, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import React from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { ThreeSixtySharp } from '@material-ui/icons';
import { getEnabledCategories } from 'node:trace_events';



interface Props {
  categories:string[]
}

interface State{
  categories?:string[],
  selectedCategory?: string,
  newCategoryName?: string,
  categoryNewName?: string
}

export default class SellerSide extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state={
      categories: this.props.categories,
      selectedCategory: this.props.categories[0],
      newCategoryName: '',
      categoryNewName: ''
    }
  }


  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleAdd = (event) =>
  {
    var newCategories = this.state.categories;
    newCategories.push(this.state.newCategoryName);
    this.setState({categories:newCategories, selectedCategory:newCategories[0], newCategoryName:''});
    alert("Category added with success!");
  }

  renameCategory = (event) =>{
    event.preventDefault;
    var categories =this.state.categories;
    const index = categories.indexOf(this.state.selectedCategory);
    categories[index] = this.state.categoryNewName;
    const voidString ="";
    this.setState({categories:categories, selectedCategory:categories[0], categoryNewName:''});
    alert("Category renamed with success!");
  }

  deleteCategory = (event) =>{
    if(this.state.categories.length!=1)
    {
        const cat = this.state.categories;
        const toRemove = this.state.selectedCategory;
        var filtered = cat.filter(function(value, index, cat){ 
          return value != toRemove;
      });
        this.setState({categories:filtered, selectedCategory:filtered[0]});
        alert("Category removed with success!");
    }
    else
    {
      alert("You must have at least one category");
    }
  }


  renderItems = (): React.ReactElement[] => (
    this.state.categories.map(
        (value:string, index: number): React.ReactElement => (
          <MenuItem
            key={index}
            value={this.state.categories[index]}>
            {this.state.categories[index]}
          </MenuItem>
        ),
      ));
  

  render(): React.ReactElement {
    return (
    <Box paddingTop={2} flexDirection="column">
        <Typography variant="h4"> Your Categories: </Typography>
        <Box display="flex" flexDirection="row" paddingTop={2}>
        <Select name="selectedCategory"
          value={this.state.selectedCategory}
          onChange={this.handleChange}
        >
          {this.renderItems()}
        </Select>
          <Box paddingLeft={3}>
            <TextField label="New:" type="text" name="categoryNewName" value={this.state.categoryNewName} onChange={this.handleChange}/> 
          </Box>
          <Box paddingTop={2} paddingLeft={3}>
            <Button variant="contained" color="primary" name="renameCategoryButton" onClick={this.renameCategory}>Rename selected category</Button>
          </Box>
        </Box>
        <Box paddingTop={2} paddingBottom={4}>
            <Button variant="contained" color="primary" name="deleteCategoryButton" onClick={this.deleteCategory}>Delete selected category</Button>
        </Box>
        <Typography variant="h5"> Add a new Category: </Typography>
        <Box display="flex" flexDirection="row">
          <TextField label="Category name:" type="text" name="newCategoryName" value={this.state.newCategoryName}onChange={this.handleChange}/> 
          <Box paddingLeft={2} paddingTop={2}>
            <Button variant="contained" color="primary" name="addCategoryButton" onClick={this.handleAdd}>Add</Button>
          </Box>
        </Box>
    </Box>
    );
  }
}
