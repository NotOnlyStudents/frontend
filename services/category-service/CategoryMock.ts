import faker from 'faker';
import { Category } from 'interfaces/categories/category';
import CategoryService from './CategoryService';

class CategoryMock implements CategoryService {
  getCategories = (): Promise<Category[]> => (new Array(10)).fill(0).map(
    () => faker.datatype.name(),
  );
}

export default CategoryMock;
