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
      email: '',
      newName: '',
      newSurname: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    console.log(attributes);
    this.setState({name:attributes["name"],surname:attributes["custom:surname"],email:attributes["email"]});
  }
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  async handleSubmit(event) {
    event.preventDefault();
    try{
      if(this.state.newName == '' && this.state.newSurname == '')
      {
        alert("Please insert some data");
        
      }
      else
      {
        let user = await Auth.currentAuthenticatedUser();
        if(this.state.newName!= '')
        {
          await Auth.updateUserAttributes(user, {
            'name': this.state.newName});
        }
        if(this.state.newSurname!='')
        {        
          await Auth.updateUserAttributes(user, {
          'custom:surname': this.state.newSurname});
        }
        alert("Data updated successfully");
        document.location.href="/";
      }
    }
    catch{
      alert("There was a problem with the server"); 
    }
  }
  async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
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
    <h1>Personal Area:</h1>
      <p>Your name: {this.state.name}</p>
      <p>Your surname: {this.state.surname}</p>
      <p>Your email: {this.state.email}</p> 
      <form onSubmit={this.handleSubmit}>
      <p>Change your name:</p>
      <input
        type='text'
        name='newName'
        onChange={this.handleChange}
      />
      <p>Change your Surname:</p>
      <input
        type='text'
        name='newSurname'
        onChange={this.handleChange}
      />
      <br/>
      <br/>
      <input type="submit" value="Save changes!" />
      </form>
      <br />
      <Link href="/">
          <button name="loginButton" onClick={this.signOut}>Sign out</button>        
      </Link>
      <br />
      <button name="deleteAccountButton" onClick={this.deleteUser}>Delete Account</button>   
    </> 
    );
  }
}
