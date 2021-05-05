import React from 'react';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { getHomeLink } from 'lib/links';
import PersonalAreaView from 'components/users/PersonalAreaView';
import Head from 'next/head';

function PersonalAreaSeller() {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Personal area' },
  ];

  return (
    <>
      <Head>
        <title>Seller personal area | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaView />
    </>
  );
}

export default PersonalAreaSeller;
