import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useField } from 'formik';

const FTextField = (props: TextFieldProps) => {
  const [field, meta] = useField(props.name || "");
  const hasError = !!(meta.touched && meta.error);
  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={hasError ? meta.error : ""}
    />
  );
}

export default FTextField;
