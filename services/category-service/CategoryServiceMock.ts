import { Category } from 'interfaces/categories/category';
import CategoryService from './CategoryService';

class CategoryServiceMock implements CategoryService {
  addCategory(category: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  editCategory(id: string, category: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  removeCategory(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getCategories = async (text: string): Promise<Category[]> => ([]);
}

export default CategoryServiceMock;
