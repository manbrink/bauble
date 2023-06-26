describe("Deck Builder", () => {
  before(() => {
    cy.login();
    cy.get('[data-cy="deckListItemTest"]').click();
    cy.get('[data-cy="deckBuilderLink"]').click();
  });

  it("allows decks to be created with valid info", () => {});
});
