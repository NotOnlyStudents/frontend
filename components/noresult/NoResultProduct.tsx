import React from 'react';
import { makeStyles } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import {
  Box, Link, Theme, Typography,
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

function NoResultProduct() {
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
          No product found,
          <br />
          return to
          {' '}
          <Link
            href="/"
            className={classes.link}
            underline="always"
          >
            home
          </Link>
          {' '}
          and start shopping!
        </Typography>
      </Box>
    </Box>
  );
}

export default NoResultProduct;
