import "@testing-library/cypress/add-commands";

describe("adding a restaurant", () => {
  it("displays the restaurant in the list", () => {
    const restaurantName = "Sushi Place";
    // setup
    cy.visit("http://localhost:3000");
    cy.viewport("iphone-6");

    testModalOpeningAndClosing();
    cy.getByText(/add restaurant/i).click();
    checkIfInputHasAutoFocus();
    submitFormWithValueFlow(restaurantName);
    checkIfNewModalHasEmtpyInput();
  });

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
    cy.focused().should('have.attr', 'id', 'name');
  }

  function submitFormWithValueFlow(restaurantName) {
    cy.getByLabelText("name").type(restaurantName);
    cy.getByText("save").click();
    // confirm that form does not exist
    cy.get("form").should("not.exist");
    cy.contains(restaurantName);
  }

  function checkIfNewModalHasEmtpyInput() {
    // checks if opening again a modal will have empty input
    cy.getByText(/add restaurant/i).click();
    cy.getByLabelText("name").should('have.attr', 'value', '');
  }
});
