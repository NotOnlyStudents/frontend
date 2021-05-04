import HTTPRequest from 'lib/HTTPRequest';
import { Category } from 'interfaces/categories/category';
import queryString from 'query-string';
import { CategoriesGETRequest } from 'interfaces/categories/category-request';
import CategoryService from './CategoryService';

class CategoryServiceFetch implements CategoryService {
  getCategories = async (text: string): Promise<Category[]> => {
    const req: HTTPRequest = new HTTPRequest('categories');
    const query: string = queryString.stringify({ text });

    const res: CategoriesGETRequest = await req.get<CategoriesGETRequest>(query);

    return res.data;
  };
}

export default CategoryServiceFetch;
