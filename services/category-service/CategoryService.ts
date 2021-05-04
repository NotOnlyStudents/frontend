import { Category } from 'interfaces/categories/category';

interface CategoryService {
  getCategories(text: string) : Promise<Category[]>
}

export default CategoryService;
