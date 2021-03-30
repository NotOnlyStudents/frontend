import { CognitoUser } from '@aws-amplify/auth';
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
      Auth.currentAuthenticatedUser()
      .then(user => {
          return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
      })
      .then(data => {alert("You change your password with success!"); document.location.href = "/";})
      .catch(err => alert("There was a problem!"));
      }     

    render() {
      return (
        <>
        <form onSubmit={this.handleSubmit}>
          <label>Old password:</label>
            <input name="oldPassword" type="password" onChange={this.handleChange}/>
          <br />
          <label>New password:</label>
            <input name="newPassword" type="password" onChange={this.handleChange}/>
          <br />
            <input type="submit" value="Save changes!" />
        </form>
        </>
      );
    }
  }
