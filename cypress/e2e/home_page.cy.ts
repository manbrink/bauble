describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/", { failOnStatusCode: false });

    cy.contains("h1", "Bauble");
    cy.contains("p", "Minimalist Magic the Gathering deck builder.");
    cy.contains("a", "Decks");
    cy.contains("a", process.env.PATREON_URL!);

    cy.get("div[id=splash]").should(
      "have.css",
      "background-image",
      `url("${process.env.SPLASH_IMAGE_URL}")`
    );

    // logged out user redirected to sign in page when visiting decks link
    cy.contains("a", "Decks").click();
    cy.url().should("include", "/sign-in");
  });
});
