import 'cypress-file-upload';

Cypress.Commands.add("getCy", (identifier) => {
  cy.get(`[data-cy=${identifier}]`);
});

Cypress.Commands.add("applicationState", () => {
  cy.window().its("store");
});

Cypress.Commands.add("authenticateUser", (options) => {
  const defaultSettings = {
    name: "Random Person",
    email: "random@email.com",
  };
  cy.applicationState().invoke("dispatch", {
    type: "user/setCurrentUser",
    payload: { ...defaultSettings, ...options },
  });
});

Cypress.Commands.add('authenticateWithTokenAndVisit', () => {
  cy.intercept("GET", "**/auth/validate_token**", {
    fixture: "authenticatedUser.json",
  }).as("validateTokenCall");
  cy.visit("/");
  const values =
    '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
  cy.setLocalStorage("auth-storage", values);
})