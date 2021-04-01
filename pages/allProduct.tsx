import React from "react";
import Layout from "components/Layout";
import { getAllProduct } from "services/productService"
import ProductCategoryList from "components/ProductCategoryList";

export default function ProductListPage(items) {
  return (
    <Layout _authState = {_authState} _username = {_username} title = "Prodotti | EmporioLambda">
      <div>
        <ProductCategoryList products={items} />
      </div>
    </Layout>
  );
}

ProductListPage.getInitialProps = async () => {
  return { items: await getAllProduct() };
};
