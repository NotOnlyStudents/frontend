import { Category } from 'interfaces/categories/category';

class CategoryServiceMock {
  getCategories = async (): Promise<Category[]> => (['a', 'b', 'c']);
}

export default CategoryServiceMock;
