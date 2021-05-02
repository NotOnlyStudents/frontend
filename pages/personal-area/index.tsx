import React from 'react';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { getHomeLink } from 'lib/links';
import PersonalAreaView from 'components/users/PersonalAreaView';
import { Auth } from 'aws-amplify';
import { PersonalAreaInformations } from 'interfaces/users/users';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { isSeller } from 'lib/authContext';
import Head from 'next/head';

function PersonalAreaCustomer() {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Personal area' },
  ];
  return (
    <>
      <Head>
        <title>Your personal area | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaView />
      <Box display="flex" justifyContent="flex-end">
        <Button color="secondary" variant="contained">
          <DeleteIcon />
          Delete your account
        </Button>
      </Box>
    </>
  );
}

export default PersonalAreaCustomer;
