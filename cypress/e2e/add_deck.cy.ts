describe("Adding a deck", () => {
  before(() => {
    cy.login();
    cy.get('[data-cy="add-deck-link"]').click();
  });

  it("allows decks to be created with valid info", () => {
    cy.get('[data-cy="create-deck-button"]').click();

    cy.url().should("include", "/decks/new");
    cy.contains("div", "Required");
    cy.contains("div", "Please choose a valid card");

    cy.get('[data-cy="deck-name-input"]').type("Test");

    cy.get('[data-cy="featured-card"]').type("Norin the Wary (Time Spiral)");

    cy.get('[data-cy="deck-description-input"]').type("Test Description");

    cy.get('[data-cy="deck-format-input"]').select("commander");

    cy.get('[data-cy="create-deck-button"]').click();

    cy.url().should("include", "/gallery");
    cy.contains("div", "Test");
    cy.contains("div", "Commander (EDH)");
    cy.contains("div", "Test Description");
    cy.contains("a", "Add Cards");

    cy.get('[data-cy="navbar-decks-link"]').click();
    cy.contains("h2", "Test");
    cy.contains("p", "Commander (EDH)");
  });
});
