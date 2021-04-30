import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { PersonalAreaInformations } from 'interfaces/users/users';
import EditIcon from '@material-ui/icons/Edit';
import { getEditPersonalAreaLink } from 'lib/links';

interface Props {
  info: PersonalAreaInformations,
  seller?: boolean,
}

function PersonalAreaView({ info, seller }: Props) {
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
