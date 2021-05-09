import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import NoResult, { noResultStyle } from './NoResult';

function NoResultCategory() {
  return (
    <NoResult
      icon={NotInterestedIcon}
    >
      No category found
    </NoResult>
  );
}

export default NoResultCategory;
