import { Box, Button, TextField } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React from 'react';

interface Props{
  oldPassword?:string;
  newPassword?:string;
}

interface State{
  oldPassword:string;
  newPassword?:string;
}

export default class FormPassword extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange = (event) => {
      const nam = event.target.name;
      const val = event.target.value;
      this.setState({ [nam]: val });
    }

    async handleSubmit(event) {
      event.preventDefault();
      Auth.currentAuthenticatedUser()
        .then((user) => Auth.changePassword(user, this.state.oldPassword, this.state.newPassword))
        .then((data) => { alert('You change your password with success!'); document.location.href = '/'; })
        .catch((err) => alert('There was a problem!'));
    }

    render() {
      return (
          <form onSubmit={this.handleSubmit}>
            <Box display="flex" paddingLeft={2} paddingTop={4}>
              <Box display="flex" flexDirection="column">
                <TextField label="Old password:" type="password" name="oldPassword" onChange={this.handleChange}/> 
                <TextField label="New password:" type="password" name="newPassword" onChange={this.handleChange}/> <br />
                <Button type="submit" variant="contained" color="primary" onClick={this.handleSubmit}>Save Changes!</Button>
              </Box>
            </Box>
          </form>
      );
    }
}
