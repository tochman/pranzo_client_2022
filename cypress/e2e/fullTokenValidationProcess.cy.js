describe("User is authenticated using stored token", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/auth/validate_token**", {
      fixture: "authenticatedUserWithVendor.json",
    }).as("validateTokenCall");
    cy.intercept("GET", "**//api/vendors/**", {
      fixture: "vendorWithoutAffiliates.json",
    }).as("fetchVendor");
    cy.intercept("GET", "**/api/vendors/**/vouchers", {
      fixture: "vouchersIndex",
    }).as("fetchVouchersIndex");
    cy.visit("/");
    const values =
      '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    cy.setLocalStorage("auth-storage", values);
  });

  it("is expected to store currentUser in application state", () => {
    cy.wait("@validateTokenCall");
    cy.window()
      .pipe((window) => window.store.getState().user.currentUser)
      .should("not.be", "undefined")
      .and("be.an", "object");
  });

  it("is expected to store vendor in application state", () => {
    cy.wait("@fetchVendor");
    cy.window()
      .pipe((window) => window.store.getState().user.vendor)
      .should("not.be", "undefined")
      .and("be.an", "object");
  });

  it("is expected to store vouchers in application state", () => {
    cy.wait("@fetchVouchersIndex");
    cy.window()
      .pipe((window) => window.store.getState().user.vouchers)
      .should("not.be", "undefined")
      .and("be.an", "array");
  });
});
