import React from "react";
import { Product } from "../../interfaces/products/product";

export default function ProductCategoryList({
  products,
}: {
  products: Product[];
}) {
  console.log(products);
  return (
    <div>
       {products ? (
         products.map((singleProduct: Product) =>
           <div key={singleProduct.id}>
             <p>{singleProduct.name}</p>
           </div>
         )) : (
         <p>No product found</p>
      )}
    </div>
  );
}
