import "@testing-library/cypress/add-commands";

describe("adding a restaurant", () => {
  it("displays the restaurant in the list", () => {
    const restaurantName = "Sushi Place";
    cy.visit("http://localhost:3000");
    cy.get("input").should("not.exist");

    cy.getByText(/add restaurant/i).click();
    cy.get("input").should("exist");

    cy.getByLabelText("name").type(restaurantName);

    cy.getByText("save").click();

    cy.contains(restaurantName);
  });
});
