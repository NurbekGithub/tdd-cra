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

const dishes = [
  {
    id: 1,
    name: "Vulcano"
  },
  {
    id: 2,
    name: "SF"
  },
  {
    id: 3,
    name: "Mega Burger"
  }
];

describe("adding a dish", () => {
  it("displays dish in the list", () => {
    const restaurantName = "Sushi Place";
    const dishName = "Vulcano";

    cy.server();
    cy.route({
      method: "GET",
      url: "/restaurants/1",
      response: {
        restaurantName,
        dishes
      }
    });
    cy.route({
      method: "POST",
      url: "/restaurants/1",
      response: {
        restaurantName,
        dishes: [...dishes, { id: dishes.length + 1, name: dishName }]
      }
    });
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
