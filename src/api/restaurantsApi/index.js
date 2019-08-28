import { instance } from "../requestConfig";

export function getRestaurants() {
  return instance.get("/restaurants").then(res => res.data);
}
