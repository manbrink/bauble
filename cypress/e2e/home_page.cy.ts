describe("The Home Page", () => {
  before(() => {
    cy.visit("/", { failOnStatusCode: false });
  });

  it("successfully loads", () => {
    cy.contains("h1", "Bauble");
    cy.contains("p", "Minimalist Magic the Gathering deck builder.");

    cy.get("a[id=decks-link]").should("have.attr", "href", "/decks");

    cy.get("a[id=patreon-link]").should(
      "have.attr",
      "href",
      Cypress.env("PATREON_URL")
    );

    cy.get("div[id=splash]").should(
      "have.css",
      "background-image",
      `url("${Cypress.config().baseUrl}${Cypress.env("SPLASH_IMAGE_URL")}")`
    );

    cy.get("a[id=decks-link]").click();
    cy.url().should("include", "/sign-in");
  });
});
