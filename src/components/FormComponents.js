import React from 'react';
import { TextField } from "@material-ui/core";

export function renderTextField({ field, form, ...rest }) {
  return <TextField {...field} {...rest} />;
}