import CartServiceFetch from './CartServiceFetch';
import CartServiceMock from './CartServiceMock';

export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? CartServiceMock : CartServiceFetch;