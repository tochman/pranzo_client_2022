Cypress.Commands.add("acceptAllGDPR", () => {
  const options = {
    session: true,
    persistent: true,
    necessary: true,
    preferences: true,
    statistics: true,
    marketing: true,
    firstParty: true,
    thirdParty: true,
  };
  const name = "USE_COOKIE_CONSENT_STATE";
  cy.clearCookie(name);
  cy.setCookie(name, encodeURIComponent(JSON.stringify(options)));
});

Cypress.Commands.add("rejectAllGDPR", () => {
  const options = {
    session: false,
    persistent: false,
    necessary: false,
    preferences: false,
    statistics: false,
    marketing: false,
    firstParty: false,
    thirdParty: false,
  };
  const name = "USE_COOKIE_CONSENT_STATE";
  cy.clearCookie(name);
  cy.setCookie(name, encodeURIComponent(JSON.stringify(options)));
});
