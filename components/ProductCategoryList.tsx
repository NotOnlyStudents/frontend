import React from "react";
import { Product } from "../interfaces/product";

export default class ProductCategoryList extends React.Component<{ products: Product[] }> {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    return (
        <>
        <div>
            <div>
                { products ? (
                    products.map((singleProduct) => (
                        <div key={singleProduct.id}>
                            {singleProduct.image ? <img src={singleProduct.id} alt={singleProduct.description} /> : ""}
                            <pre>{singleProduct.name}</pre>
                            <pre>{singleProduct.price}</pre>
                        </div>
                    ))
                ) : (
                    <p>No product found</p>
                )
                }
            </div>
        </div>
        </>
    );
  }
}
