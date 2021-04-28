import { Box, Button, TextField, Typography, Fab, Input } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import Link from 'next/link';
import React from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';



interface Props {
}

interface State{}

export default class SellederSide extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  /*  this.state = {
      companyName: '',
      companyDescription: '',
      logo: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);*/
  }


 /* handleChange = (event) => {
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
  }*/

  /*
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
              <TextField label="Company's name:" type="text" name="companyName" onChange={this.handleChange}/> 
              <Box paddingLeft={4} paddingTop={2} paddingRight={2}>
                <Typography>New logo:</Typography>
              </Box>
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
            <Box display="flex" paddingTop={2}>
              <Box display="flex" paddingLeft={2} width={415}>
                <TextField
                  fullWidth
                  name = "companyDescription"
                  onChange={this.handleChange}
                  id="standard-multiline-static"
                  label="Company's description"
                  multiline
                  rows={4}/>
              </Box>
              <Box display = "flex" paddingLeft={2} paddingTop={5} height={87}>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Changes!</Button>
              </Box>
            </Box>
        </Box>
        <br/>
        <Box borderBottom={1} width="100%"></Box>
        </form>
    </>
   */

  render(): React.ReactElement {
    return (
    <Box display="flex" marginTop={4}>
      <Button variant="contained" color="primary" href="/plp">Modify your products</Button>
      <Box marginLeft={2}>
        <Button variant="contained" color="primary" >Modify your categories</Button>
      </Box>
    </Box>
    );
  }
}
