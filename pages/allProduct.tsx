import React from "react";
import Layout from "../components/Layout";
import { Product } from "../interfaces/products/product";
import ProductCategoryList from "../components/products/ProductCategoryList";

export default function ProductListPage(items) {
  return (
    <div>
      {items.stargazers_count}
    </div>
  );
}

ProductListPage.getInitialProps = async () => {
  const response = await fetch(`https://api.github.com/repos/vercel/next.js`);
  const result = await response.json();
  //console.log(result);
  return { items: result };
};
