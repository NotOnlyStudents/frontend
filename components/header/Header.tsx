import { AuthState } from "@aws-amplify/ui-components";
import { AppBar, Typography } from "@material-ui/core";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import React from "react";
import HeaderNotAuthenticated from "./HeaderNotAuthenticated";
import HeaderSeller from "./HeaderSeller";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HeaderCustomer from "./HeaderCustomer";

interface Props {
  authState: AuthState;
  username: string | undefined;
}

interface State {}

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
    <AppBar position='fixed'>
      <Typography className={classes.title} variant="h1" noWrap>
        EmporioLambda
      </Typography>

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {renderHeader()}
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export default Header;
