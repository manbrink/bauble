describe("User Log In", () => {
  it("allows the user to sign in", () => {
    cy.visit("/", { failOnStatusCode: false });

    cy.contains("button", "Sign In").click();

    cy.get("input[id=identifier-field]").type(Cypress.env("TEST_USER_EMAIL"));

    cy.contains("button", /^Continue$/).click(); // use exact match

    cy.get("input[id=password-field]").type(Cypress.env("TEST_USER_PASSWORD"));

    cy.contains("button", "Continue").click();

    cy.url().should("include", "/decks");
  });
});
