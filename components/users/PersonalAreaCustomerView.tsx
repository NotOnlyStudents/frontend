import React from 'react';
import { Typography } from '@material-ui/core';
import { PersonalAreaInformations } from 'interfaces/users/users';

interface Props {
  info: PersonalAreaInformations;
}

function PersonalAreaCustomerView({ info }: Props) {
  return (
    <>
      <Typography variant="h4" component="h2">
        Personal area
      </Typography>
      <Typography>
        Name:
      </Typography>
      { info.name }
      <Typography>
        Surname:
      </Typography>
      { info.surname }
      <Typography>
        Email:
      </Typography>
      { info.email }
    </>
  );
}

export default PersonalAreaCustomerView;
