import React from 'react';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { getHomeLink } from 'lib/links';
import PersonalAreaCustomerView from 'components/users/PersonalAreaCustomerView';
import { withSSRContext } from 'aws-amplify';
import { PersonalAreaInformations } from 'interfaces/users/users';

interface Props {
  info: PersonalAreaInformations;
}

function PersonalAreaCustomer({
  info,
}: Props) {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Personal area' },
  ];

  return (
    <>
      <div id="root">
        <EMLBreadcrumb paths={breadcrumbPaths} />
        <PersonalAreaCustomerView info={info} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { Auth } = withSSRContext();
  let name: string;
  let surname: string;
  let email: string;

  try {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    name = attributes['custom:firstName'];
    surname = attributes['custom:lastName'];
    email = attributes.email;
    console.log(Auth);
  } catch (error) {
    console.error(error);
    document.location.href = getHomeLink();
  }

  return {
    props: {
      info: {
        name,
        surname,
        email,
      },
    },
  };
}

export default PersonalAreaCustomer;
