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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  };

  async handleSubmit(event):Promise<void> {
    console.log(this.state.companyName + " " + this.state.companyDescription + " " + this.state.logo);
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
              <TextField label="Company's name:" type="text" name="companyName" onChange={this.handleChange}/> 
              <label htmlFor="images-picker">
                  <Fab component="span" color="primary">
                    <AddPhotoAlternateIcon />
                  </Fab>
                  <input
                    name = "logo"
                    accept="image/*"
                    id="images-picker"
                    type="file"
                    hidden
                    onChange={this.handleChange}
                  />
                </label>
            </Box>
                <Box display = "flex" paddingLeft={2}>
                  <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Changes!</Button>
                </Box>
              </Box>
              <Box display="flex" paddingLeft={2} paddingTop={2}>
                  <TextField
                    name = "companyDescription"
                    onChange={this.handleChange}
                    id="standard-multiline-static"
                    label="Company's description"
                    multiline
                    rows={4}
                  />
              </Box>
            </Box>
        </form>
    </>
    );
  }
}
