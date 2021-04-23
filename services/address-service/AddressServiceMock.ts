import { Address } from 'interfaces/address/address';
import AddressService from './AddressService';

class AddressServiceMock implements AddressService {
  getAllAddress = async (): Promise<Address[]> => (['a', 'b', 'c']);
}

export default AddressServiceMock;
