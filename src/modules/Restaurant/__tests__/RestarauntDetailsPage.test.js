import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import RestaurantDetailsPage from "../RestaurantDetailsPage";
import {
  createDishForRestaraunt,
  getDishesOfRestaraunt
} from "../../../api/restaurantsApi";
jest.mock("../../../api/restaurantsApi");

afterEach(cleanup);

describe("<RestarauntDetailsPage />", () => {
  beforeEach(() => {
    getDishesOfRestaraunt.mockResolvedValue({
      restarauntName: "Suzuki",
      dishes: [{ id: 1, name: "Toyota" }]
    });
    createDishForRestaraunt.mockResolvedValue({
      restarauntName: "Suzuki",
      dishes: [{ id: 1, name: "Toyota" }, { id: 2, name: "Audi" }]
    });
  });
  it("loads dishes of selected restaraunt (with id 1)", async () => {
    const { getByText, container } = render(
      <RestaurantDetailsPage match={{ params: { id: 1 } }} />
    );

    await wait();
    getByText(/toyota/i);
    expect(getDishesOfRestaraunt).toHaveBeenCalledWith({ restarauntId: 1 });
    const listItems = container.querySelectorAll("ul > li");
    expect(listItems.length).toEqual(1);
  });

  it("creates dish for selected restaraunt (with id 1) and updates results", async () => {
    const { getByText, container, getByLabelText, getByTestId } = render(
      <RestaurantDetailsPage match={{ params: { id: 1 } }} />
    );

    await wait();

    fireEvent.click(getByText(/add dish/i));
    fireEvent.change(getByLabelText("name"), {
      target: { value: "Audi" }
    });
    fireEvent.submit(getByTestId("NewDishForm"));

    await wait();

    expect(createDishForRestaraunt).toHaveBeenCalledWith({
      restarauntId: 1,
      dish: { name: "Audi" }
    });
    getByText("Toyota");
    getByText("Audi");
    const listItems = container.querySelectorAll("ul > li");
    expect(listItems.length).toEqual(2);
  });
});
