import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function NewRestaurantForm({ handleSubmit }) {
  const [name, setName] = useState("");

  function _handleSubmit(e) {
    e.preventDefault();
    handleSubmit(name);
  }

  return (
    <form onSubmit={_handleSubmit} data-testid="NewRestaurantForm">
      <TextField
        id="name"
        label="name"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
      />
      <Button color="primary" type="submit" variant="contained">
        save
      </Button>
    </form>
  );
}
