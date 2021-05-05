import CartServiceFetch from './CartServiceFetch';
import CartServiceMock from './CartServiceMock';

export default process.env.NODE_ENV === 'development' ? CartServiceMock : CartServiceFetch;
