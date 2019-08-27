import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, FastField } from "formik";
import { renderTextField } from "../../components/FormComponents";

function NewRestaurantForm() {
  return (
    <Form data-testid="NewRestaurantForm">
      <FastField
        name='name'
        id='name'
        autoFocus
        label='name'
        component={renderTextField}
      />
      <Button color="primary" type="submit" variant="contained">
        save
      </Button>
    </Form>
  );
}

export default function FormWrapper({handleSubmit}) {
  return <Formik
    initialValues={{name: ''}}
    onSubmit={handleSubmit}
    component={NewRestaurantForm}
  />    
}
