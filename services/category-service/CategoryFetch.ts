import CategoryService from './CategoryService';

class CategoryFetch implements CategoryService {
  getCategories(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
}

export default CategoryFetch;
