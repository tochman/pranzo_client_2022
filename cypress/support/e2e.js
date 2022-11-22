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
  cy.intercept("?restaurant", { fixture: "dummy.jpeg" });
  cy.intercept("?avatar", { fixture: "dummy.jpeg" });
  cy.intercept("?logo", { fixture: "bocado_logo_color.png" });
});

afterEach(() => {
  cy.removeLocalStorage("auth-storage");
});
