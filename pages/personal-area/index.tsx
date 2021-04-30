import React from 'react';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { getHomeLink } from 'lib/links';
import PersonalAreaCustomerView from 'components/users/PersonalAreaView';
import { Auth } from 'aws-amplify';
import { PersonalAreaInformations } from 'interfaces/users/users';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { isSeller } from 'lib/authContext';

function PersonalAreaCustomer() {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Personal area' },
  ];

  const [info, setInfo] = React.useState<PersonalAreaInformations>({
    name: '',
    surname: '',
    email: '',
  });

  const getPersonalInformation = async () => {
    const { attributes, signInUserSession } = await Auth.currentAuthenticatedUser();

    setInfo({
      name: attributes['custom:firstName'],
      surname: attributes['custom:lastName'],
      email: attributes.email,
    });
  };

  React.useEffect(() => {
    getPersonalInformation();
  }, []);

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PersonalAreaCustomerView
        info={info}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button color="secondary" variant="contained">
          <DeleteIcon />
          Delete your account
        </Button>
      </Box>
    </>
  );
}

export default PersonalAreaCustomer;
