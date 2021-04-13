import { CategoriesGETRequest, Category } from 'interfaces/products/category';
import HTTPRequest from 'lib/HTTPRequest';

const getCategories = async (): Promise<Category[]> => {
  const req: HTTPRequest = new HTTPRequest('products/categories');
  const res: CategoriesGETRequest = await req.get<CategoriesGETRequest>();

  return res.categories;
};

export {
  getCategories,
};
