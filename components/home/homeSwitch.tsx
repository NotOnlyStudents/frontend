import { Auth } from "aws-amplify";
import React from "react";
import { PLPProductItem } from 'interfaces/products/product';
import { Button, Link, Typography } from "@material-ui/core";
import PLPList from "components/plp/PLPList";
import { ClassNameMap } from "@material-ui/styles";

interface State{
    home: React.ReactElement
  }
  
  interface Props {
    products: PLPProductItem[];
    classes: ClassNameMap<"root" | "description" | "evidenceTitle">
  }
  

    export default class HomeSwitch extends React.Component<Props,State>{
    constructor(props)
    {
       super(props);
       this.state = {home:null};
    }

    createProductPage(): void
    {
        this.setState({ home:(this.props.products.length !== 0
            ? (
              <>
                <Typography
                  className={this.props.classes.evidenceTitle}
                  variant="h4"
                  component="h2"
                >
                  Featured products
                </Typography>
                <PLPList products={this.props.products} />
              </>
            )
            : <></>)});
    }

    async componentDidMount(): Promise<void> {
        try {
          const { signInUserSession } = await Auth.currentAuthenticatedUser();
          if(signInUserSession.accessToken.payload["cognito:groups"][0]=="sellers")
            {this.setState({home:<div>Sono la pagine del seller</div>});}
          else
            {this.createProductPage();}
        } catch {
            this.createProductPage();
        }
      }
    
      render(): React.ReactElement{
        return (<>{this.state.home}</>);
    }
}