import React, { useState } from "react";
import NewRestaurantForm from "./NewRestaurantForm";

export default function RestaurantListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurants, setRestaurants] = useState(["first"]);

  function handleSubmit(name) {
    setRestaurants(prevState => [...prevState, name]);
    setModalVisible(false);
  }
  return (
    <div>
      <button onClick={() => setModalVisible(true)}>Add Restaurant!</button>
      {modalVisible && (
        <div>
          <NewRestaurantForm handleSubmit={handleSubmit} />
        </div>
      )}
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant}>{restaurant}</li>
        ))}
      </ul>
    </div>
  );
}
