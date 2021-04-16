import { Category } from 'interfaces/products/category';

class CategoryServiceMock {
  getCategories = async (): Promise<Category[]> => (
    (new Array(3)).map(
      (): Category => (
        'a'
      ),
    )
  );
}

export default CategoryServiceMock;
