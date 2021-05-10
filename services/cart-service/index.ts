import { Auth } from 'aws-amplify';
import { SignedState } from 'interfaces/login';
import { getSignedState } from 'lib/authContext';
import CartServiceFetch from './CartServiceFetch';
import CartServiceMock from './CartServiceMock';
import CartServiceLocal from './CartServiceFetch';


/*
function auth()
{   
    try{
        const val = getSignedState(Auth.currentAuthenticatedUser());
        console.log(val);
        return val;
    }
    catch {return false;}
}
*/

//export default auth()===SignedState.Customer? CartServiceMock : CartServiceMock;
export default CartServiceLocal;