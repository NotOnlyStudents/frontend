import { AuthState } from "@aws-amplify/ui-components";
import { AppBar, Typography, InputBase } from "@material-ui/core";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import React from "react";
import HeaderNotAuthenticated from "./HeaderNotAuthenticated";
import Toolbar from '@material-ui/core/Toolbar';
import HeaderSeller from "./HeaderSeller";
import SearchIcon from "@material-ui/icons/Search";
import HeaderCustomer from "./HeaderCustomer";
import Box from "@material-ui/core/Box";

interface Props {
  authState: AuthState;
  username: string | undefined;
}

function Header({ authState, username }: Props): React.ReactElement {
  const sellerUsername = "seller";
  const classes = useStyles();

  const renderHeader = (): React.ReactElement => {
    const header =
      authState === AuthState.SignedIn ? (
        username == sellerUsername ? (
          <HeaderSeller />
        ) : (
          <HeaderCustomer />
        )
      ) : (
        <HeaderNotAuthenticated />
      );

    return header;
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.container}>
          <Typography >
            EmporioLambda
          </Typography>
          <Box className={classes.search}>
            <Box className={classes.searchIcon}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      title: 26,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
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
      justifyContent: 'center'
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
  }),
);

export default Header;
