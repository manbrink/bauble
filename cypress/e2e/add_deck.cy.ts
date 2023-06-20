describe("Adding a Deck", () => {
  it("successfully loads", () => {
    cy.login();

    cy.contains("a", "Add Deck").click();

    cy.get("input[id=name]").type("Test Deck");

    cy.get("input[id=featuredCard]").type("Norin the Wary");
    cy.get("div[id=card-search-input-select] > div").first().click();

    cy.get("input[id=description]").type("Test Description");

    cy.get("select[id=format]").select("1");

    cy.contains("button", "Create Deck").click();
  });
});
