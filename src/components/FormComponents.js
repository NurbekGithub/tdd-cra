import React from 'react';
import { TextField, FormControl, FormHelperText } from "@material-ui/core";

export function renderTextField({ field, form, ...rest }) {
  const error = form.touched[field.name] && form.errors[field.name];
  return <FormControl error={!!error}>
    <TextField {...field} {...rest} />
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
  
}