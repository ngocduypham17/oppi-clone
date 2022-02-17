import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface IInputField {
  form: any;
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
}

const InputField = (props: IInputField) => {
  const { form, name, label, type, disabled } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name={name}
          type={type}
          label={label}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          autoComplete="off"
          error={Boolean(hasError)}
          helperText={formState.errors[name]?.message}
        />
      )}
    />
  );
};

InputField.defaultProps = {
  disabled: false,
};

export default InputField;
