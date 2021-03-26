import { Category } from "./category";

export interface Product {
  readonly id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  image: string[];
  quantity: number;
}

/*export class Products implements Product {
  constructor(
    readonly id: number,
    public name: string,
    public description: string,
    public category: Category,
    public price: number,
    public image: string[],
    public quantity: number
  ) {}
}*/
