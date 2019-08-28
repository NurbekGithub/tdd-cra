import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RestaurantListPage from "../RestaurantListPage";
import { getRestaurants, createRestaurant } from "../../../api/restaurantsApi";
jest.mock("../../../api/restaurantsApi");

afterEach(cleanup);

describe("<RestaurantListPage />", () => {
  beforeEach(() => {
    getRestaurants.mockResolvedValue([{ id: 1, name: "New Restaurant" }]);
    createRestaurant.mockResolvedValue([
      { id: 1, name: "New Restaurant" },
      { id: 2, name: "Spuki puk" }
    ]);
  });
  it("loads restaurants list from api and displays it", async () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <RestaurantListPage />
      </MemoryRouter>
    );

    await wait();

    expect(getRestaurants).toHaveBeenCalled();
    getByText("New Restaurant");
    const listItems = container.querySelectorAll("ul > a");
    expect(listItems.length).toEqual(1);
  });

  it("create new restaurant and updates list", async () => {
    const { getByText, getByLabelText, getByTestId, container } = render(
      <MemoryRouter>
        <RestaurantListPage />
      </MemoryRouter>
    );

    await wait();

    fireEvent.click(getByText(/add restaurant/i));
    fireEvent.change(getByLabelText("name"), {
      target: { value: "Spuki puk" }
    });
    fireEvent.submit(getByTestId("NewRestaurantForm"));

    await wait();

    expect(createRestaurant).toHaveBeenCalledWith({ name: "Spuki puk" });
    getByText("New Restaurant");
    getByText("Spuki puk");
    const listItems = container.querySelectorAll("ul > a");
    expect(listItems.length).toEqual(2);
  });
});
