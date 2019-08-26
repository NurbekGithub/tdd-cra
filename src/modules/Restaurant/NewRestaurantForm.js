import React, { useState } from "react";

export default function NewRestaurantForm({ handleSubmit }) {
  const [name, setName] = useState("");

  function _handleSubmit(e) {
    e.preventDefault();
    handleSubmit(name);
  }

  return (
    <form onSubmit={_handleSubmit}>
      <label htmlFor="name">
        name
        <input
          type="text"
          id="name"
          name="name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <button type="submit">save</button>
    </form>
  );
}
