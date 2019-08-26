import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import NewRestaurantForm from "../NewRestaurantForm";

afterEach(cleanup);

describe("<NewRestaurantForm />", () => {
  describe("clicking the save button", () => {
    const submitMock = jest.fn();
    it("calls the handleSubmit with restaurant name", () => {
      const { getByLabelText, getByTestId } = render(
        <NewRestaurantForm handleSubmit={submitMock} />
      );
      const restaurantName = "Sushi place";
      const input = getByLabelText("name");
      fireEvent.change(input, { target: { value: restaurantName } });
      // bug in jsdom https://github.com/testing-library/react-testing-library/issues/234
      // fireEvent.click(getByText("save"));
      // so we have to fire submit on form itself
      fireEvent.submit(getByTestId("NewRestaurantForm"));
      expect(submitMock).toHaveBeenCalledWith(restaurantName);
    });
  });
});
