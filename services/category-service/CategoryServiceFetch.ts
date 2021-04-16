import HTTPRequest from 'lib/HTTPRequest';
import { CategoriesGETRequest, Category } from 'interfaces/products/category';
import CategoryService from './CategoryService';

class CategoryServiceFetch implements CategoryService {
  getCategories = async (): Promise<Category[]> => {
    const req: HTTPRequest = new HTTPRequest('categories');
    const res: CategoriesGETRequest = await req.get<CategoriesGETRequest>();
    return res.data;
  };
}

export default CategoryServiceFetch;
