import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import NewRestaurantForm from "../NewRestaurantForm";

afterEach(cleanup);

describe("<NewRestaurantForm />", () => {
  describe("clicking the save button", () => {
    const submitMock = jest.fn();
    it("calls the handleSubmit with restaurant name", () => {
      const { getByText, getByLabelText } = render(
        <NewRestaurantForm handleSubmit={submitMock} />
      );
      const restaurantName = "Sushi place";
      const input = getByLabelText("name");
      fireEvent.change(input, { target: { value: restaurantName } });
      fireEvent.click(getByText("save"));
      expect(submitMock).toHaveBeenCalledWith(restaurantName);
    });
  });
});
