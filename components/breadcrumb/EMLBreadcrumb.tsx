import {
  Box, Breadcrumbs, Link, Theme, Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import React from 'react';
import theme from 'styles/theme';

interface Props {
  paths: BreadcrumbPath[]
}

const useStyles = makeStyles({
  link: {
    display: 'flex',
    color: 'inherit',
  },
});

function EMLBreadcrumb({ paths } : Props) {
  const classes = useStyles();
  const iconTheme = {
    root: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  };

  const renderOthersPaths = () => paths
    .slice(0, paths.length - 1)
    .map((path: BreadcrumbPath) => {
      let Icon;

      if (path.icon) {
        Icon = withStyles(iconTheme)(path.icon);
      } else {
        Icon = () => <></>;
      }

      return (
        <Link className={classes.link} href={path.href}>
          <Icon />
          { path.name }
        </Link>
      );
    });

  const renderLastPath = (path: BreadcrumbPath) => <Typography color="textPrimary">{ path.name }</Typography>;

  return (
    <Box m={2}>
      <Breadcrumbs aria-label="breadcrumb">
        { renderOthersPaths() }
        { renderLastPath(paths[paths.length - 1]) }
      </Breadcrumbs>
    </Box>
  );
}

export default EMLBreadcrumb;
