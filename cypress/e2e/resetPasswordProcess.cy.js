describe("Reset Password process", () => {
  beforeEach(() => {

    cy.visit("/auth/sign-in");
  });

  context("Step 1: request password reset", () => {
    beforeEach(() => {
      cy.getCy("reset-password").click();
    });

    it("is expected to navigate to reset password view", () => {
      cy.location("pathname").should("eq", "/auth/reset-password");
    });

    describe("submitting the form with an existing user", () => {
      beforeEach(() => {
        cy.intercept("POST", "**/auth/password", {
          fixture: "passwordResetRequestSuccess.json",
        }).as("passwordResetRequest");
        cy.getCy("email").type("kalle@random.com");
        cy.getCy("submit").click();
      });

      it("is expected to return a message", () => {
        cy.wait("@passwordResetRequest").then(({ response }) => {
          expect(response.body).to.have.own.property(
            "message",
            "An email has been sent to 'kalle@random.com' containing instructions for resetting your password."
          );
        });
      });

      it('is expected to display a message', () => {
        cy.get("body").should("contain.text", "An email has been sent to 'kalle@random.com' containing instructions for resetting your password.");
      });

      it("is expected to redirect to sign-in view", () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });
    });

    describe("submitting the form with a nonexisting user", () => {
      beforeEach(() => {
        cy.intercept("POST", "**/auth/password", {
          fixture: "passwordResetRequestError.json", statusCode: 404,
        }).as("passwordResetRequestError");
        cy.getCy("email").type("kalle@random.com");
        cy.getCy("submit").click();
      });

      it('is expected to display a message', () => {
        cy.get("body").should("contain.text", "Kunde inte hitta användaren med email 'nonexistent@random.com'.");
      });

      it("is expected to redirect to sign-in view", () => {
        cy.location("pathname").should("eq", "/auth/reset-password");
      });
    });
  });
});
