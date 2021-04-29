import { PLPProductItem } from './product';

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
    quantity: product.quantity,
  };
}
