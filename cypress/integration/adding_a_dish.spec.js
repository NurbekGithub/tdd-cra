import "@testing-library/cypress/add-commands";

describe("adding a dish", () => {
  it("displays dish in the list", () => {
    const restaurantName = "Sushi Place";
    const dishName = "Vulcano";
    cy.visit("http://localhost:3000");

    addingRestaurantFlow(restaurantName);
    goToRestaurantDetailsPage(restaurantName);
    testModalOpeningAndClosing();
    checkIfInputHasAutoFocus();
    addingDishFlow(dishName);
  });
});

function addingRestaurantFlow(restaurantName) {
  cy.getByText(/add restaurant/i).click();
  cy.getByLabelText("name").type(restaurantName);
  cy.getByText("save").click();
}

function goToRestaurantDetailsPage(restaurantName) {
  cy.getAllByText(restaurantName)
    .first()
    .click();
}

function testModalOpeningAndClosing() {
  // confirm that form does not exist yet
  cy.get("form").should("not.exist");
  cy.getByText(/add dish/i).click();
  // confirm that form does exist
  cy.get("form").should("exist");
  cy.getByText(/cancel/i).click();
  // confirm that form does exist
  cy.get("form").should("not.exist");
}

function checkIfInputHasAutoFocus() {
  // make sure input field is focused automatically
  cy.getByText(/add dish/i).click();
  cy.focused().should("have.attr", "id", "name");
  cy.getByText(/cancel/i).click();
}

function addingDishFlow(dishName) {
  cy.getByText(/add dish/i).click();
  cy.getByLabelText("name").type(dishName);
  cy.getByText("save").click();
  // confirm that form does not exist
  cy.get("form").should("not.exist");
  cy.contains(dishName);
}
