import { AmplifyRequireNewPassword } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom';


interface password{
  oldPassword?:string;
  newPassword?:string;
}

export default class FormPassword extends React.Component<password,any> {
    constructor(props) {
      super(props);
      this.state = {
        oldPassword: "",
        newPassword: ""
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    async handleSubmit(event) {
      event.preventDefault();
      console.log(this.state.oldPassword);
        console.log(this.state.newPassword);
        Auth.currentAuthenticatedUser()
        .then(user => {return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);});
    }

    /*
    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.oldPassword);
        console.log(this.state.newPassword);
        Auth.currentAuthenticatedUser()
        .then(user => {
        return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
    } */   
        

    render() {
      return (

        <form onSubmit={this.handleSubmit}>
          <label>Old password:</label>
            <input name="oldPassword" type="text" onChange={this.handleChange}/>
          <br />
          <label>New password:</label>
            <input name="newPassword" type="text" onChange={this.handleChange}/>
          <br />
            <input type="submit" value="Save changes!" />
        </form>
      );
    }
  }
