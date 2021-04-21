import OrderServiceFetch from './OrderServiceFetch';
import OrderServiceMock from './OrderServiceMock';

export default process.env.NODE_ENV === 'development' ? OrderServiceMock : OrderServiceFetch;
