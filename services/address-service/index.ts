import AddressServiceFetch from './AddressServiceFetch';
import AddressServiceMock from './AddressServiceMock';

export default process.env.NODE_ENV === 'development' ? AddressServiceMock : AddressServiceFetch;
