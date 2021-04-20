import { AuthState } from '@aws-amplify/ui-components';
import {
  AppBar, Typography, InputBase, Link,
} from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Router, { NextRouter, useRouter } from 'next/router';
import LogoIcon from 'components/icons/LogoIcon';
import HeaderNotAuthenticated from './HeaderNotAuthenticated';
import HeaderSeller from './HeaderSeller';
import HeaderCustomer from './HeaderCustomer';

interface Props {
  authState: AuthState;
  username: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  search: {
    width: '80%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}));

function Header({ authState, username }: Props): React.ReactElement {
  const sellerUsername = 'seller';
  const classes = useStyles();
  const router: NextRouter = useRouter();

  const [searchText, setSearchText] = useState(router.query.text || '');

  const renderHeader = (): React.ReactElement => {
    const isSigned: boolean = authState === AuthState.SignedIn;
    let header: React.ReactElement;
    if (isSigned) {
      header = username === sellerUsername ? (<HeaderSeller />) : (<HeaderCustomer />);
    } else {
      header = <HeaderNotAuthenticated />;
    }

    return header;
  };

  const handleSearchEnter = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      const newPage = {
        pathname: '/plp',
        query: router.query,
      };

      if (searchText) {
        newPage.query.text = searchText;
      } else {
        delete newPage.query.text;
      }

      Router.push(newPage);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container}>
        <Typography variant="h6" component="h1">
          <Link className={classes.link} href="/">
            <LogoIcon />
            EmporioLambda
          </Link>
        </Typography>
        <div className={classes.searchContainer}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchText}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyUp={handleSearchEnter}
            />
          </div>
        </div>
        <div>
          {renderHeader()}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
