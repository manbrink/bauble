describe("Deck Builder", () => {
  before(() => {
    cy.login();
    cy.get('[data-cy="deckListItemTest"]').click();
    cy.get('[data-cy="deckBuilderLink"]').click();
  });

  it("validates card input data and allows valid cards to be added to the deck", () => {
    cy.contains("p", "Add cards to see stats");
    cy.contains("p", "No cards in main board");

    cy.get('[data-cy="featured-card"]').click();
    cy.get('[data-cy="card-quantity"]').click();
    cy.contains("div", "Required");
    cy.contains("div", "Please choose a valid card");

    cy.get('[data-cy="featured-card"]').type("Norin the Wary (Time Spiral)");

    cy.get('[data-cy="card-quantity"]').type("-1");
    cy.contains("div", "Must be at least 1");

    cy.get('[data-cy="card-quantity"]').type("1");

    cy.get('[data-cy="featured-card"]').should("have.value", "");
    cy.get('[data-cy="card-quantity"]').should("have.value", "1");
    cy.get('[data-cy="card-board"]').should("have.value", "main");

    cy.get('[data-cy="num-cards"]').should("have.value", "1");
    cy.get('[data-cy="avg-cmc"]').should("have.value", "1.00");
    cy.get('[data-cy="Creature-count"]').should("have.value", "1");

    cy.get('[data-cy="card-table"]').contains("td", "Norin the Wary");
    cy.get('[data-cy="card-table"]').contains("td", "1");

    cy.get('[data-cy="featured-card"]').type(
      "Lightning Bolt (Limited Edition Alpha)"
    );
    cy.get('[data-cy="card-quantity"]').type("1");
    cy.get('[data-cy="card-board"]').select("sideboard");
    cy.get('[data-cy="switch-board"]').click();
    cy.get('[data-cy="card-table"]').contains("td", "Lightning Bolt6");
    cy.get('[data-cy="card-table"]').contains("td", "1");
  });
});
