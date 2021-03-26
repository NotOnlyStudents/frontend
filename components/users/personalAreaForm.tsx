import { Auth } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';

export interface User {
    name: string;
    surname: string;
}


export default class FormNome extends React.Component<{}, { value: User }> {
    constructor(props) {
      super(props);
      var voidUser = { name:"", surname:""};
      this.state = { value: voidUser};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      alert('E\' stato inserito un nome: ' + this.state.value.name);
      
      let user = await Auth.currentAuthenticatedUser();
  
      let result = await Auth.updateUserAttributes(user, {
          'name': this.state.value.name
      });
      console.log(result);
      const { attributes } = await Auth.currentAuthenticatedUser();
      console.log(attributes);
    }


    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>First Name:</label> 
            <input type="text" value={this.state.value.name} onChange={this.handleChange} />
            <br />
          <label>Last Name:</label>  
            <input type="text" value={this.state.value.surname} onChange={this.handleChange} />
            <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
    
  }