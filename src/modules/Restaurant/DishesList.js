import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";

export default function DishesList({ dishes }) {
  return (
    <List subheader={<Typography variant="h6">Dishes</Typography>}>
      {dishes.map(dish => (
        <ListItem key={dish} divider>
          {dish}
        </ListItem>
      ))}
    </List>
  );
}
