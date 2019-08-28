import React, { useState, useEffect } from "react";
import NewRestaurantForm from "./NewRestaurantForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider
} from "@material-ui/core";
import RestaurantsList from "./RestaurantsList";
import { getRestaurants, createRestaurant } from "../../api";

export default function RestaurantListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  function handleSubmit(values, actions) {
    createRestaurant({ name: values.name })
      .then(restaurants => setRestaurants(restaurants))
      .catch(console.error)
      .finally(() => {
        setModalVisible(false);
        actions.setSubmitting(false);
      });
  }

  useEffect(() => {
    getRestaurants()
      .then(restaurants => setRestaurants(restaurants))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Button onClick={() => setModalVisible(true)} variant="outlined">
        Add Restaurant!
      </Button>
      <Dialog open={modalVisible}>
        <DialogTitle>
          New restaurant
          <Divider orientation="vertical" />
          <Button onClick={() => setModalVisible(false)}>cancel</Button>
        </DialogTitle>
        <DialogContent>
          <NewRestaurantForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <RestaurantsList restaurants={restaurants} />
    </div>
  );
}
