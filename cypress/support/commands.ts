/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<any>;
  }
}

Cypress.Commands.add("login", () => {
  cy.session(
    Cypress.env("TEST_USER_EMAIL"),
    () => {
      cy.visit("/", { failOnStatusCode: false });

      cy.contains("button", "Sign In").click();

      cy.get("input[id=identifier-field]").type(Cypress.env("TEST_USER_EMAIL"));

      cy.contains("button", /^Continue$/).click(); // use exact match

      cy.get("input[id=password-field]").type(
        Cypress.env("TEST_USER_PASSWORD")
      );

      cy.contains("button", "Continue").click();

      cy.url().should("include", "/decks");
    },
    {
      validate: () => {
        // cy.getCookie("__session", { timeout: 30000 }).should("exist"); timeouts don't work?
      },
    }
  );
});
