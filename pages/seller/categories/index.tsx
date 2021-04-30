import SellerSide from "components/seller/SellerSide";
import { BreadcrumbPath } from "interfaces/breadcrumb";
import HomeIcon from '@material-ui/icons/Home';
import React from "react";
import EMLBreadcrumb from "components/breadcrumb/EMLBreadcrumb";

function Home()
{
    const breadcrumbPaths:BreadcrumbPath[] = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Categories' },
      ];
      
    const categories = ['Carte','Tavolo','Bicicletta'];
    return (
        <>
    <EMLBreadcrumb paths={breadcrumbPaths} />
    <SellerSide categories={categories}/>
    </>);
}

export default Home