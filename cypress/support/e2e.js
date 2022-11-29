import "./commands";
import "cypress-pipe";
import "cypress-localstorage-commands";

beforeEach(() => {
  cy.intercept("GET", "**/auth/validate_token**", { fixture: 'signUpAuthenticationError.json', statusCode: 401 });
  cy.intercept("GET", "**/api/vendors/**/vouchers", {
    fixture: "vouchersIndex",
  });
});

beforeEach(() => {
  cy.intercept("?logo", { fixture: "bocado_logo_color.png" });
  cy.intercept("POST", "https://hooks.slack.com/services/**", {
    body: { message: "ok" },
    statusCode: 200,
  });
});

afterEach(() => {
  cy.removeLocalStorage("auth-storage");
});
