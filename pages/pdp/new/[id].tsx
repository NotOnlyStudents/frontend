import PDPEdit from 'components/pdp/PDPEdit';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';

function PDPEditPage() {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page', href: '/plp' },
    { name: 'New' },
  ];

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPEdit product={product} />
    </>
  );
}

export default PDPEditPage;
