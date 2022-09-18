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