import PDPEdit from 'components/pdp/PDPEdit';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { Product } from 'interfaces/products/product';

function PDPNewPage() {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page', href: '/plp' },
    { name: 'New' },
  ];

  const title = 'Creating new product';

  const product: Product = {
    name: '',
    description: '',
    images: [],
    quantity: 0,
    price: 1,
    evidence: false,
    discount: 0,
    categories: [],
  };

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPEdit
        title={title}
        product={product}
        creation
      />
    </>
  );
}

export default PDPNewPage;