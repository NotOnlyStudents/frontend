export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  evidence: boolean;
  discount: number;
  categories: string[];
}

export interface PLPProductItem {
  id: string,
  name: string,
  price: number,
  image: string,
  evidence: string,
  discount: number,
  quantity: number
}

export interface ProductsGETRequest {
  products: PLPProductItem[]
}

export interface ProductFilter
{
    text?: string,
    categories?: string[],
    priceMax?: number,
    priceMin?: number,
    available?: boolean
}
