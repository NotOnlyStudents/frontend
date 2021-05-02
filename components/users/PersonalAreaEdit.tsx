import { Auth } from 'aws-amplify';
import TextFieldValidation from 'components/validation/TextFieldValidation';
import { PersonalAreaInformations } from 'interfaces/users/users';
import React from 'react';

function PersonalAreaEdit() {
  const [info, setInfo] = React.useState<PersonalAreaInformations>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validation, setValidation] = React.useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const getPersonalInformation = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();

    setInfo({
      ...info,
      name: attributes['custom:firstName'],
      surname: attributes['custom:lastName'],
      email: attributes.email,
    });
  };

  React.useEffect(() => {
    getPersonalInformation();
  }, []);

  const setError = (id: string, error: boolean) => {
    const newValidaiton = validation;

    validation[id] = error;

    setValidation(newValidaiton);
  };

  const handleChangeName = (name: string) => {
    setInfo({ ...info, name });
  };

  const handleChangeSurname = (surname: string) => {
    setInfo({ ...info, surname });
  };

  const handleChangeEmail = (email: string) => {
    setInfo({ ...info, email });
  };

  const handleChangePassword = (password: string) => {
    setInfo({ ...info, password });

    if (password) {
      const samePassword = password !== info.confirmPassword;

      if (samePassword ^ validation.confirmPassword) {
        setError('confirmPassword', samePassword);
      }
    } else {
      setError('confirmPassword', false);
    }
  };

  const handleChangeConfirmPassword = (confirmPassword: string) => {
    setInfo({ ...info, confirmPassword });

    const samePassword = confirmPassword !== info.password;

    if (samePassword ^ validation.confirmPassword) {
      setError('confirmPassword', samePassword);
    }
  };

  return (
    <>
      <TextFieldValidation
        id="name"
        label="Name"
        placeholder="Insert your name"
        helperText="Required name"
        value={info.name}
        fullWidth
        margin="normal"
        handleChange={handleChangeName}
        setError={setError}
        error={validation.name}
        rules="required"
      />

      <TextFieldValidation
        id="surname"
        label="Surname"
        placeholder="Insert your surname"
        helperText="Required surname"
        value={info.surname}
        fullWidth
        margin="normal"
        handleChange={handleChangeSurname}
        setError={setError}
        error={validation.surname}
        rules="required"
      />

      <TextFieldValidation
        id="email"
        label="Email"
        placeholder="Insert your email"
        helperText="Required email"
        value={info.email}
        fullWidth
        margin="normal"
        handleChange={handleChangeEmail}
        setError={setError}
        error={validation.email}
        rules="required|email"
      />

      <TextFieldValidation
        id="password"
        label="Password"
        placeholder="Insert your new password or keep it empty if you don't want to change it"
        helperText=""
        value={info.password}
        fullWidth
        margin="normal"
        handleChange={handleChangePassword}
        setError={setError}
        error={validation.password}
      />

      <TextFieldValidation
        id="confirmPassword"
        label="Confirm password"
        placeholder="Insert again your password to confirm it"
        value={info.confirmPassword}
        fullWidth
        margin="normal"
        handleChange={handleChangeConfirmPassword}
        error={validation.confirmPassword}
      />
    </>
  );
}

export default PersonalAreaEdit;
