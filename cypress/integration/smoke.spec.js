describe("Smoke test", () => {
  it("makes sure welcome message comes up!", () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000").contains("Hello, world");
  });
});
