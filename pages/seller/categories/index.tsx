import { BreadcrumbPath } from 'interfaces/breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { getHomeLink } from 'lib/links';
import CategoriesList from 'components/categories/CategoriesList';
import {
  Box, Dialog, IconButton, Typography,
} from '@material-ui/core';
import Head from 'next/head';
import AddIcon from '@material-ui/icons/Add';
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';
import CategoryEdit from 'components/categories/CategoryEdit';

interface Props {
  categories: Category[]
}

function CategoriesPage({ categories }: Props) {
  const [open, setOpen] = React.useState(false);

  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Categories' },
  ];

  const newCategory: Category = '';

  const handleClickNewCategory = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Categories | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Categories
        </Typography>
        <IconButton
          onClick={handleClickNewCategory}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <CategoriesList categories={categories} />
      <Dialog open={open} onClose={handleCloseDialog}>
        <CategoryEdit category={newCategory} handleAddAddress={handleCloseDialog} creation />
      </Dialog>
    </>
  );
}

export async function getServerSideProps({ query }) {
  let categories: Category[] = [];

  try {
    categories = await (new CategoryService()).getCategories(query.text || '');
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      categories,
    },
  };
}

export default CategoriesPage;
