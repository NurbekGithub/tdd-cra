import React, { useState } from "react";
import NewRestaurantForm from "./NewRestaurantForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import RestaurantsList from "./RestaurantsList";

export default function RestaurantListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  function handleSubmit(name) {
    setRestaurants(prevState => [...prevState, name]);
    setModalVisible(false);
  }
  return (
    <div>
      <Button onClick={() => setModalVisible(true)} variant="outlined">
        Add Restaurant!
      </Button>
      <Dialog open={modalVisible}>
        <DialogTitle>New restaurant</DialogTitle>
        <DialogContent>
          <NewRestaurantForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <RestaurantsList restaurants={restaurants} />
    </div>
  );
}
