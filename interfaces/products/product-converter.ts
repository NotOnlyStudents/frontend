import { CartProduct, PLPProductItem, Product } from './product';

export function productToPLPProductItem(
  product: Product,
): PLPProductItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    evidence: product.evidence,
    discount: product.discount,
    quantity: product.quantity as number,
  };
}

export function productToCartProduct(
  product: Product,
): CartProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    discount: product.discount,
    quantity: product.quantity as number,
  };
}
