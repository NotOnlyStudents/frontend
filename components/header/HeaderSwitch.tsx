import { Auth } from "aws-amplify";
import React from "react";
import HeaderCustomer from "./HeaderCustomer";
import HeaderNotAuthenticated from "./HeaderNotAuthenticated";
import HeaderSeller from "./HeaderSeller";

interface State{
  header: React.ReactElement
}

interface Props{
}

async function signOut() {
  try {
    await Auth.signOut();
    document.location.href = '/';
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export default class HeaderSwtich extends React.Component<Props,State>{
    constructor(props)
    {
      super(props);
      this.state = {header:null};
    }
  
    async componentDidMount() {
      try {
        const { signInUserSession } = await Auth.currentAuthenticatedUser();
        if(signInUserSession.accessToken.payload["cognito:groups"][0]=="sellers")
          this.setState({header:<HeaderSeller signOut={signOut}/>});
        else
          this.setState({header:<HeaderCustomer signOut={signOut}/>});
      } catch {
        this.setState({header:<HeaderNotAuthenticated/>});
      }
    }
  
    render(): React.ReactElement{
      return (<>{this.state.header}</>);
  }
}

