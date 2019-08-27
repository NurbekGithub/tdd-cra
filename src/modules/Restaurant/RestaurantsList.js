import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function RestaurantsList({ restaurants }) {
  return (
    <List subheader={<Typography variant="h6">Restaraunts</Typography>}>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant} divider component={Link} to={`/restaurants/${restaurant}`}>
          {restaurant}
        </ListItem>
      ))}
    </List>
  );
}
