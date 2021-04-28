import React from 'react';
import PersonalAreaForm from 'components/users/personalAreaForm';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';

export default function PersonalArea() {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'PersonalArea' },
  ];
  return (
    <>
      <div id="root">
        <EMLBreadcrumb paths={breadcrumbPaths} />
        <PersonalAreaForm />
      </div>
    </>
  );
}
