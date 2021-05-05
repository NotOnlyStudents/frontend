import HTTPRequest from 'lib/HTTPRequest';
import { Category } from 'interfaces/categories/category';
import queryString from 'query-string';
import {
  CategoriesGETRequest, CreateCategoryRequest, EditCategoryRequest, RemoveCategoryRequest,
} from 'interfaces/categories/category-request';
import CategoryService from './CategoryService';

class CategoryServiceFetch implements CategoryService {
  getCategories = async (text: string = ''): Promise<Category[]> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'categories',
    );
    const query: string = queryString.stringify({ text });

    const res: CategoriesGETRequest = await req.get<CategoriesGETRequest>(query);

    return res.data;
  };

  addCategory = async (category: Category): Promise<Category> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'categories',
    );

    const body: string = JSON.stringify(category);

    const res: CreateCategoryRequest = await req.post<CreateCategoryRequest>(body);

    return res.data;
  };

  editCategory = async (id: string, category: Category): Promise<Category> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `categories/${id}`,
    );

    const body: string = JSON.stringify(category);

    const res: EditCategoryRequest = await req.patch<EditCategoryRequest>(body);

    return res.data;
  };

  removeCategory = async (id: string): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(
      process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `categories/${id}`,
    );

    await req.delete<RemoveCategoryRequest>();
  };
}

export default CategoryServiceFetch;
