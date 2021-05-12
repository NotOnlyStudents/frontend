import CartServiceFetch from './CartServiceFetch';
import CartServiceMock from './CartServiceMock';

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
// export default process.env.NEXT_PUBLIC_SERVICE_METHOD === 'mock' ? CartServiceMock : CartServiceFetch;
export default CartServiceFetch;
