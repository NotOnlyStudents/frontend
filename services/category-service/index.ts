import CategoryMock from './CategoryMock';
import CategoryFetch from './CategoryFetch';

export default process.env.NODE_ENV === 'development' ? CategoryMock : CategoryFetch;
