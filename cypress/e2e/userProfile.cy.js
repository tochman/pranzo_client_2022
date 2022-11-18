describe("User profile", () => {
  beforeEach(() => {
    cy.intercept("PUT", "**/auth", { fixture: "resetPasswordRequest.json" }).as(
      "passwordResetRequest"
    );
    cy.authenticateWithTokenAndVisit();
    cy.getCy("user-avatar").click();
    cy.getCy("user-name").click();
  });

  it("", () => {
    cy.location("pathname").should("eq", "/user");
  });

  describe("change password", () => {
    beforeEach(() => {
      cy.getCy("change-password-cta").click();
      cy.getCy("current-password-field").type("current_password");
      cy.getCy("new-password-field").type("new_password");
      cy.getCy("new-password-confirmation-field").type("new_password");
      cy.getCy("change-password-submit").click();
    });

    it("is expected to make a put request to api", () => {
      cy.wait("@passwordResetRequest")
        .its("request.method")
        .should("eql", "PUT");
    });
  });
});
