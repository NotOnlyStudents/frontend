import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import Link from 'next/link';
import React from 'react';
import SellerSide from './SellerSide';

export interface Props {
  name?: string;
  surname?: string;
  email?: string
}

export interface State { 
    name?: string,
    surname?: string,
    email?: string,
    newName?: string,
    newSurname?: string
    seller?: React.ReactElement
 }

export default class PersonalAreaForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      newName: '',
      newSurname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount():Promise<void>  {
    try {
      console.log(Auth.currentAuthenticatedUser());
      const { attributes } = await Auth.currentAuthenticatedUser();
      const { signInUserSession } = await Auth.currentAuthenticatedUser();
      this.setState({ name: attributes['custom:firstName'], surname: attributes['custom:lastName'], email: attributes.email });
      if(signInUserSession.accessToken.payload["cognito:groups"][0]=="sellers")
        this.setState({seller:<SellerSide />});
    } catch {
      document.location.href = '/';
    }
  }

  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  };

  async handleSubmit(event):Promise<void> {
    try {
      if (this.state.newName == '' && this.state.newSurname == '') {
        alert('Please insert some data');
      } else {
        const user = await Auth.currentAuthenticatedUser();
        if (this.state.newName != '') {
          await Auth.updateUserAttributes(user, { 'custom:firstName': this.state.newName });
        }
        if (this.state.newSurname != '') {
          await Auth.updateUserAttributes(user, { 'custom:lastName': this.state.newSurname });
        }
        alert('Data updated successfully');
        document.location.href = '/';
      }
    } catch {
      alert('There was a problem with the server');
    }
   /* let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
      'email': 'matteo16.martini@gmail.com',
    });
  console.log(result);*/
    
  }



  async deleteUser():Promise<void>  {
    if (window.confirm('Are you sure you wish to delete your account? =('))
    { 
      const user = await Auth.currentAuthenticatedUser();
      user.deleteUser((error) => {
        if (error) {
          alert('There was a problem!');
        } else {
          alert('You delete your account with success');
          document.location.href = '/';
        }
      });
    }
  }

/*  <Box paddingLeft={2}>
    <TextField label="Change your Email:" type="text" name="email" onChange={this.handleChange}/> 
    </Box> */

  render(): React.ReactElement {
    return (
      <>
        <Box border={1} marginTop={4}>
          <Box m={2}>
          <Typography> {this.state.name} {this.state.surname}</Typography> 
          <Typography>Email: {this.state.email}</Typography>
          </Box>
        </Box>
        <form>
          <Box display="flex" paddingLeft={2} paddingTop={4}>
            <Box display="flex">
              <TextField label="Change your name:" type="text" name="newName" onChange={this.handleChange}/> 
              <Box paddingLeft={2}>
                <TextField label="Change your Surname:" type="text" name="newSurname" onChange={this.handleChange}/> 
              </Box>
            </Box>
            <Box display="flex" paddingLeft={4}>
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Changes!</Button>
            </Box>
          </Box>
        </form>
        <Box paddingTop={4} paddingBottom={2} borderBottom={1}>
          <Link href="/users/changePassword" >
            <Button variant="contained" color="primary">Change your password!</Button>
          </Link>
          <br />
          <br />
          <Button variant="contained" color="primary" name="deleteAccountButton" onClick={this.deleteUser}>Delete Account</Button>
        </Box>
        {this.state.seller}
      </>
    );
  }
}
