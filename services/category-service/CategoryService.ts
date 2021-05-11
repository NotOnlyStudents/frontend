import { Category } from 'interfaces/categories/category';

interface CategoryService {
  getCategories(text: string) : Promise<Category[]>;
  addCategory(category: Category): Promise<Category>;
  editCategory(id: string, category: Category): Promise<Category>
  removeCategory(id: string): Promise<void>;
}

export default CategoryService;
