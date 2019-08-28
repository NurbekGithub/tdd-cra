import "@testing-library/cypress/add-commands";

const restaurants = [
  {
    id: 1,
    name: "Sushi Place",
    dishes: [1, 2]
  },
  {
    id: 2,
    name: "Burger Place",
    dishes: [3]
  }
];

describe("adding a restaurant", () => {
  it("displays the restaurant in the list", () => {
    const restaurantName = "Avacado";
    cy.server();
    cy.route({
      method: "GET",
      url: "/restaurants",
      response: restaurants
    });
    cy.route({
      method: "POST",
      url: "/restaurants",
      response: [...restaurants, { id: 3, name: restaurantName }]
    });
    // setup
    cy.visit("http://localhost:3000");
    cy.viewport("iphone-6");

    checkIfInitialDataIsShowing();
    testModalOpeningAndClosing();
    checkIfInputHasAutoFocus();
    addingRestaurantFlow(restaurantName);
    checkIfNewModalHasEmtpyInput();
  });
});

function checkIfInitialDataIsShowing() {
  cy.getByText("Sushi Place");
  cy.getByText("Burger Place");
}

function testModalOpeningAndClosing() {
  // confirm that form does not exist yet
  cy.get("form").should("not.exist");
  cy.getByText(/add restaurant/i).click();
  // confirm that form does exist
  cy.get("form").should("exist");
  cy.getByText(/cancel/i).click();
  // confirm that form does exist
  cy.get("form").should("not.exist");
}

function checkIfInputHasAutoFocus() {
  // make sure input field is focused automatically
  cy.getByText(/add restaurant/i).click();
  cy.focused().should("have.attr", "id", "name");
  cy.getByText(/cancel/i).click();
}

function addingRestaurantFlow(restaurantName) {
  cy.getByText(/add restaurant/i).click();
  cy.getByLabelText("name").type(restaurantName);
  cy.getByText("save").click();
  // confirm that form does not exist
  cy.get("form").should("not.exist");
  cy.contains(restaurantName);
}

function checkIfNewModalHasEmtpyInput() {
  // checks if opening again a modal will have empty input
  cy.getByText(/add restaurant/i).click();
  cy.getByLabelText("name").should("have.attr", "value", "");
}
