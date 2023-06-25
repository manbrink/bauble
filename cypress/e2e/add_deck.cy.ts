describe("Deck Builder", () => {
  it("allows the user to create a deck", () => {
    cy.login();

    cy.contains("a", "Add Deck").click();

    cy.get("input[id=name]").type("Test Deck");

    cy.get("input[id=featuredCard]").type("Norin the Wary");
    cy.get("#cbc94b02-ea21-4207-86fa-b45cc8dbdf61").click();

    cy.get("textarea[id=description]").type("Test Description");

    cy.get("select[id=format]").select("commander");

    cy.contains("button", "Create Deck").click();

    cy.url().should("include", "/gallery");
    cy.contains("div", "Test Deck");
    cy.contains("div", "Commander (EDH)");
    cy.contains("div", "Test Description");
    cy.contains("a", "Add Cards");
  });
});
