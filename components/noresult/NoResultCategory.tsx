import React from 'react';
import { makeStyles } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import {
  Box, Theme, Typography,
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noResults: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: grey[500],
    color: 'white',
    borderRadius: '50%',
    width: '50em',
    height: '50em',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '40em',
      height: '40em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '35em',
      height: '35em',
    },
  },
  icon: {
    width: '10em',
    height: '10em',
  },
  text: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: 'white',
  },
  link: {
    color: 'white',
  },
}));

function NoResultCategory() {
  const classes = useStyles();

  return (
    <Box
      className={classes.container}
    >
      <Box
        className={classes.noResults}
      >
        <NotInterestedIcon
          className={classes.icon}
        />
        <Typography className={classes.text}>
          No category found
        </Typography>
      </Box>
    </Box>
  );
}

export default NoResultCategory;
