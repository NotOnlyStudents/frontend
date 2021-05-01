import { Address } from 'interfaces/address/address';

interface AddressService {
  getAllAddress(): Promise<Address[]>;
  getAddressById(id: string): Promise<Address>;
  createAddress(address: Address): Promise<Address>;
  editAddress(id: string, address: Address): Promise<Address>;
  deleteAddress(id: string): Promise<void>;
}

export default AddressService;
