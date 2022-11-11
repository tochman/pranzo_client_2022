describe("User profile", () => { 
  beforeEach(() => {
    // cy.intercept("GET", "**/auth/validate_token**", {
    //   fixture: "authenticatedUser.json",
    // }).as("validateTokenCall");
    // cy.visit("/");
    // const values =
    //   '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    // cy.setLocalStorage("auth-storage", values);
    cy.authenticateWithTokenAndVisit()
    cy.getCy('user-avatar').click()
    cy.getCy('user-name').click()
  });

  it.only('', () => {
    cy.location("pathname").should("eq", "/user");
  });

})