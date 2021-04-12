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
import Router, { useRouter } from 'next/router';
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
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
  search: {
    position: 'relative',
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header({ authState, username }: Props): React.ReactElement {
  const sellerUsername = 'seller';
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  const renderHeader = (): React.ReactElement => {
    const isSigned: boolean = authState === AuthState.SignedIn;
    let header;

    if (isSigned) {
      header = username === sellerUsername ? (<HeaderSeller />) : (<HeaderCustomer />);
    } else {
      header = <HeaderNotAuthenticated />;
    }

    return header;
  };

  const handleSearchEnter = (event: React.KeyboardEvent<typeof InputBase>) => {
    if (event.key === 'Enter') {
      Router.push({
        pathname: '/plp',
        query: { text: searchText },
      });
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container}>
        <Typography variant="h6" component="h1" noWrap>
          <Link className={classes.link} href="/">
            EmporioLambda
          </Link>
        </Typography>
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
            onChange={(event) => setSearchText(event.currentTarget)}
            onKeyPress={handleSearchEnter}
          />
        </div>
        <div>
          {renderHeader()}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
