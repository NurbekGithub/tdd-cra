import React from "react";
import RestaurantListPage from "./modules/Restaurant/RestaurantListPage";
import RestaurantDetailsPage from "./modules/Restaurant/RestaurantDetailsPage";
import {Switch, Route} from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={RestaurantListPage} />
        <Route exact path='/restaurants/:name' component={RestaurantDetailsPage} />
      </Switch>
    </div>
  );
}

export default App;
