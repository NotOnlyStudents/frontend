import { Address } from 'interfaces/address/address';
import faker from 'faker';
import AddressService from './AddressService';

class AddressServiceMock implements AddressService {
  getAllAddress = async (): Promise<Address[]> => (
    (new Array(4)).fill(0)).map(
    (): Address => ({
      id: faker.datatype.uuid(),
      nation: faker.address.country(),
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      cap: parseFloat(faker.address.zipCode()),
    }
    ),
  );

  getAddressById = async (id: string): Promise<Address> => ({
    id: faker.datatype.uuid(),
    nation: faker.address.country(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    cap: parseFloat(faker.address.zipCode()),
  });

  createAddress = async (address: Address): Promise<Address> => ({
    id: faker.datatype.uuid(),
    ...address,
  });

  editAddress = async (id: string, address: Address): Promise<Address> => ({
    id,
    ...address,
  });

  deleteAddress = (id: string): Promise<void> => ({

  });
}

export default AddressServiceMock;
