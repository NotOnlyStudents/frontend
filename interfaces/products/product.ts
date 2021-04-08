export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  available: boolean;
  evidence: boolean;
  discount: number;
  categories: string[];
}

export interface ProductsGETRequest {
  products: Product[]
}

/*export class Products implements Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public category: string[],
    public price: number,
    public image: string[],
    public quantity: number,
    public available: boolean,
    public evidence: boolean,
    public discount: number
  ) {}
}*/
