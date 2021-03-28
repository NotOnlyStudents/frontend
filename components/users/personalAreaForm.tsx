import { Auth } from 'aws-amplify';
import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom';

export interface User {
    name?: string;
    surname?: string;
    email?: string
}


export default class FormPersonalArea extends React.Component<User,any>{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: ''
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
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
        'name': this.state.name,
  });
  

  

    console.log(result);
    const { attributes } = await Auth.currentAuthenticatedUser();
    console.log(attributes);


    /*
    if(attributes.email != this.state.email)
    try {
      await Auth.resendSignUp(user);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }*/

    //Cambio mail. Casino
  }
  async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
      //TO DO: CHECK CORRECTLY IF SIGNOUT WORKS FINE
      async deleteUser() {
        const user = await Auth.currentAuthenticatedUser();
        user.deleteUser((error) => {
          if (error) {
            throw error;
          }
          document.location.href = "/";
        });
      };



  render() {
    return (
    <>  
      <form onSubmit={this.handleSubmit}>
      <h1>Hello {this.state.name} {this.state.surname}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='name'
        onChange={this.handleChange}
      />
      <p>Enter your Surname:</p>
      <input
        type='text'
        name='surname'
        onChange={this.handleChange}
      />
      <p>Enter your email:</p>
      <input
        type='text'
        name='email'
        onChange={this.handleChange}
      />
      <br />
      <input type="submit" value="Save changes!" />
      </form>
      <br />
      <Link href="/">
          <button name="loginButton" onClick={this.signOut}>Sign out</button>        
      </Link>
      <button name="deleteAccountButton" onClick={this.deleteUser}>Delete Account</button>   
   </> 
    );
  }
}
