import { Category } from 'interfaces/products/category';

interface CategoryService {
  getCategories() : Promise<Category[]>;
}

export default CategoryService;
