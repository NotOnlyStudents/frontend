import React from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import 'components/users/personalAreaForm';
import FormPassword from 'components/users/changePasswordForm';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';

function changePassowrd() {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Personal Area', href:'/users/personalArea' },
    { name: 'Change Password'}
  ];
  return (
    <>
      <div id="root">
        <EMLBreadcrumb paths={breadcrumbPaths} />
        <FormPassword />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  try {
    return {
      props: {
        _authState: AuthState.SignedIn,
        _username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      props: {
        _authState: AuthState.SignedOut,
      },
    };
  }
}

export default changePassowrd;