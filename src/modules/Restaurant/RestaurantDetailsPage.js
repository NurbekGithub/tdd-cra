import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import NewDishForm from "./NewDishForm";
import DishesList from "./DishesList";
import { getDishesOfRestaraunt, createDishForRestaraunt } from "../../api";

export default function RestaurantDetailsPage({
  match: {
    params: { id }
  }
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dishes, setDishes] = useState([]);

  function handleSubmit(values, actions) {
    createDishForRestaraunt({ restarauntId: id, dish: { name: values.name } })
      .then(({ dishes }) => {
        setDishes(dishes);
      })
      .catch(console.error)
      .finally(() => {
        setModalVisible(false);
        actions.setSubmitting(false);
      });
  }

  useEffect(() => {
    getDishesOfRestaraunt({ restarauntId: id })
      .then(({ dishes }) => {
        setDishes(dishes);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <Button variant="outlined" onClick={() => setModalVisible(true)}>
        Add dish
      </Button>
      <Dialog open={modalVisible}>
        <DialogTitle>
          New dish
          <Button onClick={() => setModalVisible(false)}>cancel</Button>
        </DialogTitle>
        <DialogContent>
          <NewDishForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <DishesList dishes={dishes} />
    </div>
  );
}
