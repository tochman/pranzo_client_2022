describe("User profile", () => {
  beforeEach(() => {
    cy.intercept("PUT", "**/auth", { fixture: "changePasswordRequest.json" }).as(
      "passwordChangeRequest"
    );
    cy.authenticateWithTokenAndVisit();
    cy.getCy("user-avatar").click();
    cy.getCy("user-name").click();
  });

  it("is expected to navigate to profile path", () => {
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
      cy.wait("@passwordChangeRequest")
        .its("request.method")
        .should("eql", "PUT");
    });

    it("is expected to include form data as params", () => {
      cy.wait("@passwordChangeRequest").then(({ request }) => {
        expect(request.body.current_password).to.eql("current_password");
        expect(request.body.password).to.eql("new_password");
        expect(request.body.password_confirmation).to.eql("new_password");
      });
    });
  });
});
