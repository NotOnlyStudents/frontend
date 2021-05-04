import { Category } from 'interfaces/categories/category';
import CategoryService from './CategoryService';

class CategoryServiceMock implements CategoryService {
  getCategories = async (text: string): Promise<Category[]> => (['a', 'b', 'c']);
}

export default CategoryServiceMock;
