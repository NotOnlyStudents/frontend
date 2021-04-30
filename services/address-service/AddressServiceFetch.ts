import HTTPRequest from 'lib/HTTPRequest';
import {
  Address,
} from 'interfaces/address/address';
import {
  AddressesDELETERequest, AddressesGETRequest, AddressesPATCHRequest, AddressesPOSTRequest,
} from 'interfaces/address/address-request';
import AddressService from './AddressService';

class AddressServiceFetch implements AddressService {
  getAllAddress = async (): Promise<Address[]> => {
    const req: HTTPRequest = new HTTPRequest('addresses');
    const res: AddressesGETRequest = await req.get<AddressesGETRequest>();

    return res.data;
  };

  getAddressById = async (id: string): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest(`addresses/${id}`);
    const res: Address = await req.get<Address>();

    return res;
  };

  createAddress = async (address: Address): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest('addresses');

    const body: string = JSON.stringify(address);

    const res: AddressesPOSTRequest = await req.post<AddressesPOSTRequest>(body);

    return res.data;
  };

  editAddress = async (id: string, address: Address): Promise<Address> => {
    const req: HTTPRequest = new HTTPRequest(`addresses/${id}`);

    const body: string = JSON.stringify(address);

    const res: AddressesPATCHRequest = await req.patch<AddressesPATCHRequest>(body);

    return res.data;
  };

  deleteAddress = async (id: string) : Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(`addresses/${id}`);

    await req.delete<AddressesDELETERequest>();
  };
}

export default AddressServiceFetch;
