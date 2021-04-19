import React from 'react';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    padding: '1em',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  resultIcon: {
    padding: '16px',
    alignItems: 'center',
    fontSize: '5em',
    width: '4em',
    height: '4em',
    justifyContent: 'center',
  },
  resultPhrase: {
    textAlign: 'center',
    fontSize: '3em',
  },
}));

function NoResult(): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <div id="icon" className={classes.container}>
        <NotInterestedIcon className={classes.resultIcon} color="primary" />
      </div>
      <p className={classes.resultPhrase}>No result found</p>
    </>
  );
}

export default NoResult;
