import "@testing-library/cypress/add-commands";

describe("adding a restaurant", () => {
  it("displays the restaurant in the list", () => {
    const restaurantName = "Sushi Place";
    cy.visit("http://localhost:3000");

    // confirm that form does not exist yet
    cy.get("form").should("not.exist");

    cy.getByText(/add restaurant/i).click();

    // confirm that form does exist
    cy.get("form").should("exist");

    cy.getByLabelText("name").type(restaurantName);

    cy.getByText("save").click();

    // confirm that form does not exist yet
    cy.get("form").should("not.exist");

    cy.contains(restaurantName);
  });
});
