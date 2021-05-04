import React from 'react';
import {
  Box,
  Dialog, FormControlLabel, IconButton, Radio, Typography,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import CategoryService from 'services/category-service/CategoryService';
import { Category } from 'interfaces/categories/category';
import CategoryRemove from './CategoryRemove';
import CategoryEdit from './CategoryEdit';

interface Props {
  category: string,
  index?: number,
  handleChangeCategory?: (category: string, index?: number) => void,
  handleRemoveCategory?: (index: number) => void,
}

function CategoryView({
  category, handleChangeCategory, index, handleRemoveCategory,
}: Props) {
  const [edit, setEdit] = React.useState(false);

  const handleCloseDialog = () => {
    setEdit(false);
  };

  const onChangeCategory = (editCategory: Category) => {
    handleChangeCategory(editCategory, index);
    handleCloseDialog();
  };

  const handleClickEditButton = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  return (
    <Box width="100%" display="flex" justifyContent="space-between">
      <Typography>
        { category }
      </Typography>
      <Box>
        <IconButton color="primary" onClick={handleClickEditButton}>
          <Edit />
        </IconButton>
        <CategoryRemove id={index.toString()} onRemove={() => handleRemoveCategory(index)} />
      </Box>
      <Dialog open={edit} onClose={handleCloseEdit}>
        <CategoryEdit
          category={category}
          handleChangeCategory={onChangeCategory}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </Box>
  );
}

export default CategoryView;
