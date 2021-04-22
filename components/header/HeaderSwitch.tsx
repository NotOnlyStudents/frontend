import { Auth } from "aws-amplify";
import React from "react";
import HeaderCustomer from "./HeaderCustomer";
import HeaderNotAuthenticated from "./HeaderNotAuthenticated";

export default class HeaderSwtich extends React.Component<any,any>{
    constructor(props)
    {
      super(props);
      this.state = {item:false, header:null};
    }
  
    async componentDidMount() {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        this.setState({ item: true });
      } catch {
        this.setState({ item:false})
      }
        //attributes.name="seller"  ?
      if (this.state.item) {
        this.setState({header:<HeaderCustomer />});
      } else {
        this.setState({header:<HeaderNotAuthenticated/>});
      }
    }
  
    render(): React.ReactElement{
      return (<>{this.state.header}</>);
  }
  }
  /*
  Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  */
