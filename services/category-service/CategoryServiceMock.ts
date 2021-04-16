import { Category } from 'interfaces/products/category';

class CategoryServiceMock {
  getCategories = async (): Promise<Category[]> => (['a', 'b', 'c']);
}

export default CategoryServiceMock;
