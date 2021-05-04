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
import { Category } from 'interfaces/categories/category';
import CategoryService from 'services/category-service';

interface Props {
  categories: Category[]
}

function CategoriesPage({ categories }: Props) {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Categories' },
  ];

  return (
    <>
      <Head>
        <title>Categories | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Categories
      </Typography>
      <CategoriesList categories={categories} />
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
