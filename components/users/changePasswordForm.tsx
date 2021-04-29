import { Auth } from 'aws-amplify';
import React, { FormEventHandler } from 'react';

interface Props{
  oldPassword?:string;
  newPassword?:string;
}

interface State {
  oldPassword: string,
  newPassword: string
}

export default class FormPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    // this.setState({ [nam]: val });
  };

  // handleSubmit = (event: FormEventHandler<HTMLFormElement>) => {
  //   Auth.currentAuthenticatedUser()
  //     .then((user) => Auth.changePassword(user, this.state.oldPassword, this.state.newPassword))
  //     .then((data) => { alert('You change your password with success!'); document.location.href = '/'; })
  //     .catch((err) => alert('There was a problem!'));
  // };

  render() {
    return (
      <>
        <form>
          <label>Old password:</label>
          <input name="oldPassword" type="password" onChange={this.handleChange} />
          <br />
          <label>New password:</label>
          <input name="newPassword" type="password" onChange={this.handleChange} />
          <br />
          <input type="submit" value="Save changes!" />
        </form>
      </>
    );
  }
}
