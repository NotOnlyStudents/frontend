import ProductServiceFetch from './ProductServiceFetch';
import ProductServiceMock from './ProductServiceMock';

export default process.env.NODE_ENV === 'development' ? ProductServiceMock : ProductServiceFetch;
