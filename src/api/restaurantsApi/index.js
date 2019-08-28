import { instance } from "../requestConfig";

export function getRestaurants() {
  return instance.get("/restaurants").then(res => res.data);
}

export function createRestaurant(data) {
  return instance.post("/restaurants", data).then(res => res.data);
}

export function getDishesOfRestaraunt({ restarauntId }) {
  return instance.get(`/restaurants/${restarauntId}`).then(res => res.data);
}

export function createDishForRestaraunt({ restarauntId, dish }) {
  return instance
    .post(`/restaurants/${restarauntId}`, dish)
    .then(res => res.data);
}
