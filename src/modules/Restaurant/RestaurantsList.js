import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";

export default function RestaurantsList({ restaurants }) {
  return (
    <List subheader={<Typography variant="h6">Restaraunts</Typography>}>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant} divider>
          {restaurant}
        </ListItem>
      ))}
    </List>
  );
}
