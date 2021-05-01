import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink } from 'lib/links';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';

function EditPersonalAreaCustomer(): React.ReactElement {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Personal area' },
  ];

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaEdit
        info={info}
      />
    </>
  );
}

export default EditPersonalAreaCustomer;
