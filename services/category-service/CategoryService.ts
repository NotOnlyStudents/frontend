import { Category } from 'interfaces/categories/category';

interface CategoryService {
  getCategories() : Promise<Category[]>
}

export default CategoryService;
