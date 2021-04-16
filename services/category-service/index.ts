import CategoryServiceFetch from './CategoryServiceFetch';
import CategoryServiceMock from './CategoryServiceMock';

export default process.env.NODE_ENV === 'development' ? CategoryServiceMock : CategoryServiceFetch;
