describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/", { failOnStatusCode: false });

    cy.contains("h1", "Bauble");
    cy.contains("p", "Minimalist Magic the Gathering deck builder.");

    const decksLink = cy.get("a[id=decks-link]");
    decksLink.should("have.attr", "href", "/decks");

    cy.get("a[id=patreon-link]").should(
      "have.attr",
      "href",
      Cypress.env("PATREON_URL")
    );

    const baseUrl = Cypress.config().baseUrl;
    cy.get("div[id=splash]").should(
      "have.css",
      "background-image",
      `url("${baseUrl}${Cypress.env("SPLASH_IMAGE_URL")}")`
    );

    // logged out user redirected to sign in page when visiting decks link
    decksLink.click();
    cy.url().should("include", "/sign-in");
  });
});
