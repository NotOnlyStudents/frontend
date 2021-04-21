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
import { Auth } from 'aws-amplify';
import { withStyles } from '@material-ui/styles';



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

/*
 function supporto()
{
    try{
    const { attributes } = 
        console.log(attributes);
    if(attributes!=null)
    {
        console.log("uomo");
      return true;
    }
    else{
        console.log("ciao");
      return false;
    }
  }
  catch{
      console.log("merad");
    return false;
  }
}*/
//  const sellerUsername = 'seller';
//username === sellerUsername ? (<HeaderSeller />) : (<HeaderCustomer />);
class Header extends React.Component<any,any>{
  constructor(props)
  {
    super(props);
    this.state = {item:false, header:null};
  }
  async supporto()
  {
    const { attributes } = await Auth.currentAuthenticatedUser();
    if(attributes!=null)
    {
      return true;
    }
    else{
      return false;
    }
  }

  /*
  handleLogin()
  {
    console.log("Eccomi");
    document.location.href=("/authenticator");
    this.setState({});
  }*/

  async componentDidMount() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      this.setState({ item: true });
    } catch {
      this.setState({ item:false})
    }

    if (this.state.item) {
      this.setState({header:<HeaderCustomer />});
    } else {
      this.setState({header:<HeaderNotAuthenticated/>});
    }
  }
  


 /* const handleSearchEnter = (
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
    }*/

  render(): React.ReactElement{
    return (
      <AppBar position="sticky">
          <div>
            {this.state.header}
          </div>
      </AppBar>
    );
}
}
/*
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/
export default withStyles(useStyles)(Header)
