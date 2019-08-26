import React, { useState } from "react";
import NewRestaurantForm from "./NewRestaurantForm";
import { Button } from "@material-ui/core";
import RestaurantsList from "./RestaurantsList";

export default function RestaurantListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState(["first"]);

  function handleSubmit(name) {
    setRestaurants(prevState => [...prevState, name]);
    setModalVisible(false);
  }
  return (
    <div>
      <Button onClick={() => setModalVisible(true)} variant="outlined">
        Add Restaurant!
      </Button>
      {modalVisible && (
        <div>
          <NewRestaurantForm handleSubmit={handleSubmit} />
        </div>
      )}
      <RestaurantsList restaurants={restaurants} />
    </div>
  );
}
