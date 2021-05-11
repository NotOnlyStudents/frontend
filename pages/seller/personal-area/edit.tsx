import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getPersonalAreaLink } from 'lib/links';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import PersonalAreaEdit from 'components/users/PersonalAreaEdit';
import Head from 'next/head';

function EditPersonalAreaSeller(): React.ReactElement {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Personal area', href: getPersonalAreaLink(true) },
    { name: 'Edit' },
  ];

  return (
    <>
      <Head>
        <title>Editing seller personal informations | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaEdit />
    </>
  );
}

export default EditPersonalAreaSeller;
