/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({ name, label, rules, defaultValue = '', ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          error={fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : props.helperText}
          label={label}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default FormInput;