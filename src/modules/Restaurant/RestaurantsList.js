import React from "react";
import { List, ListItem } from "@material-ui/core";

export default function RestaurantsList({ restaurants }) {
  return (
    <List>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant} divider>
          {restaurant}
        </ListItem>
      ))}
    </List>
  );
}
