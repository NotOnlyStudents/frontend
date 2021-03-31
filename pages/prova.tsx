import ProductCategoryList from "components/products/ProductCategoryList";
import { myJson } from "utils/product";
import { Product } from "../interfaces/products/product";

export default function Page({ props }) {
  //console.log(items);
  console.log(process.env.baseURL);
  return (
    <div>
      <ProductCategoryList products={props.products} />
    </div>
  );
}

Page.getInitialProps = async () => {
  //const res = await fetch("http://localhost:3000/utils/product");
  //const response = await res.json();
  //console.log(myJson)
  return { props: { products: myJson } };
};
