describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/", { failOnStatusCode: false }); // change URL to match your dev URL
  });
});
