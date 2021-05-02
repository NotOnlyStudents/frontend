import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { UserInfo } from 'interfaces/users/users';
import EditIcon from '@material-ui/icons/Edit';
import { getEditPersonalAreaLink } from 'lib/links';
import { Auth } from 'aws-amplify';

interface Props {
  seller?: boolean,
}

function PersonalAreaView({ seller }: Props) {
  const [info, setInfo] = React.useState<UserInfo>({
    name: '',
    surname: '',
    email: '',
  });

  const getPersonalInformation = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();

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
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Personal area
        </Typography>
        <IconButton href={getEditPersonalAreaLink(seller)}>
          <EditIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" component="h3">
        Name:
      </Typography>
      <Typography gutterBottom>
        { info.name }
      </Typography>
      <Typography variant="h5" component="h3">
        Surname:
      </Typography>
      <Typography gutterBottom>
        { info.surname }
      </Typography>
      <Typography variant="h5" component="h3">
        Email:
      </Typography>
      <Typography gutterBottom>
        { info.email }
      </Typography>
    </>
  );
}

export default PersonalAreaView;
