import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getPersonalAreaLink } from 'lib/links';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import PersonalAreaEdit from 'components/users/PersonalAreaEdit';
import Head from 'next/head';

function EditPersonalAreaCustomer(): React.ReactElement {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Personal area', href: getPersonalAreaLink() },
    { name: 'Edit' },
  ];

  return (
    <>
      <Head>
        <title>Editing your personal informations | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaEdit />
    </>
  );
}

export default EditPersonalAreaCustomer;
