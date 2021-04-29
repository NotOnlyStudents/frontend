import { TextField } from '@material-ui/core';
import React from 'react';
import Validator from 'validatorjs';

interface Props {
  id?: string,
  label?: string,
  placeholder?: string,
  helperText?: string,
  error?: boolean,
  value?: unknown,
  fullWidth?: boolean,
  type?: string,
  multiline?: boolean,
  margin?: 'none' | 'dense' | 'normal',
  handleChange?: (value: unknown) => void;
  setError?: (id: string, error: boolean) => void;
  rules?: string,
  InputProps?: unknown,
}

function TextFieldValidation(
  {
    id, setError, handleChange, label, placeholder,
    helperText, error, value, fullWidth, margin, rules,
    type, multiline, InputProps,
  }: Props,
) : React.ReactElement {
  const validate = (v: unknown) => {
    const vRules = { v: rules };

    const validation = new Validator({ v }, vRules);

    return validation.passes();
  };

  React.useEffect(() => {
    if (validate(value)) {
      if (error) { setError(id, true); }
    } else if (!error) {
      setError(id, true);
    }
  }, []);

  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      fullWidth={fullWidth}
      error={error}
      variant="outlined"
      value={value}
      multiline={multiline}
      type={type}
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          if (validate(event.target.value)) {
            if (error) { setError(id, false); }
          } else if (!error) {
            setError(id, true);
          }
          handleChange(event.target.value);
        }
      }
      margin={margin}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={InputProps}
    />
  );
}

TextFieldValidation.defaultProps = {
  margin: 'none',
};

export default TextFieldValidation;
