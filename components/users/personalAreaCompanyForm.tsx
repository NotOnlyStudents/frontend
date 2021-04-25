import { Box, Button, TextField, Typography, Fab, Input } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import Link from 'next/link';
import React from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';



export interface Props {
  name?: string;
}

export interface State { 
    companyName?: string,
    companyDescription?: string,
    logo?: string
 }

export default class PersonalAreaCompanyForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyDescription: '',
      logo: '',
    };
  }


  handleChange = (event) => {
  /*  const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });*/
  };

  async handleSubmit(event):Promise<void> {
   /* event.preventDefault();
    try {
      if (this.state.newName == '' && this.state.newSurname == '') {
        alert('Please insert some data');
      } else {
        const user = await Auth.currentAuthenticatedUser();
        if (this.state.newName != '') {
          await Auth.updateUserAttributes(user, { name: this.state.newName });
        }
        if (this.state.newSurname != '') {
          await Auth.updateUserAttributes(user, { 'custom:surname': this.state.newSurname });
        }
        alert('Data updated successfully');
        document.location.href = '/';
      }
    } catch {
      alert('There was a problem with the server');
    }*/
  }

  handleAddImage(event)
  {
    console.log(event.target.value);
  }

  render(): React.ReactElement {
    return (
    <>
        <Box border={1} marginTop={4}>
          <Box m={2}>
            <Typography> Company Name: </Typography> 
            <Typography> Company Description: </Typography>
            <Typography> Company Logo: </Typography>
          </Box>
        </Box>
        <form>
        <Box display="flex" flexDirection="column">  
          <Box display="flex" paddingLeft={2} paddingTop={4}>
            <Box display="flex">
              <TextField label="Company's name:" type="text" name="newName" onChange={this.handleChange}/> 
              <label htmlFor="images-picker">
                  <Fab component="span" color="primary">
                    <AddPhotoAlternateIcon />
                  </Fab>
                  <input
                    accept="image/*"
                    id="images-picker"
                    type="file"
                    hidden
                    onChange={this.handleAddImage}
                  />
                </label>
            </Box>
                <Box display = "flex" paddingLeft={2}>
                  <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Changes!</Button>
                </Box>
              </Box>
              <Box display="flex" paddingLeft={4}>
                  <TextField
                    id="standard-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Your company's description"
                  />
              </Box>
            </Box>
        </form>
    </>
    );
  }
}
