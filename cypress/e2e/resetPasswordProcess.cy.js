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

      it("is expected to display a message", () => {
        cy.get("body").should(
          "contain.text",
          "An email has been sent to 'kalle@random.com' containing instructions for resetting your password."
        );
      });

      it("is expected to redirect to sign-in view", () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });
    });

    describe("submitting the form with a nonexisting user", () => {
      beforeEach(() => {
        cy.intercept("POST", "**/auth/password", {
          fixture: "passwordResetRequestError.json",
          statusCode: 404,
        }).as("passwordResetRequestError");
        cy.getCy("email").type("kalle@random.com");
        cy.getCy("submit").click();
      });

      it("is expected to display a message", () => {
        cy.get("body").should(
          "contain.text",
          "Kunde inte hitta användaren med email 'nonexistent@random.com'."
        );
      });

      it("is expected to redirect to sign-in view", () => {
        cy.location("pathname").should("eq", "/auth/reset-password");
      });
    });
  });

  context("clicking the link with rest token", () => {
    beforeEach(() => {
      let url =
        "/auth/change-password?access-token=AVentiKzhU_zPsSgHD-Mjw&client=gx26GiPIZtUsR3z1LNXQIA&client_id=gx26GiPIZtUsR3z1LNXQIA&config=default&expiry=1670276329&reset_password=true&token=AVentiKzhU_zPsSgHD-Mjw&uid=thomas%2Bfake%40craftacademy.se";
      cy.visit(url);
    });

    it("is expected to create hidden field", () => {
      cy.wait(1000)
      cy.getCy("reset-token").should("exist");
    });

    it("is expected to use a wrapper around the ui", () => {
      cy.getCy("reset-password-wrapper").should("exist");
    });

    describe("submitting the form", () => {
      beforeEach(() => {
        cy.intercept("PUT", "**/auth/password", {
          fixture: "resetPasswordSuccess.json",
        }).as("passwordReset");
        cy.getCy("new-password-field").type("new_password");
        cy.getCy("new-password-confirmation-field").type("new_password");
        cy.getCy("change-password-submit").click();
      });

      it("is expected to make a put request to api", () => {
        cy.wait("@passwordReset").its("request.method").should("eql", "PUT");
      });

      it("is expected to navigate to sign-in path", () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });

      it("is expected to display success message", () => {
        cy.get("body").should("contain.text", "Ditt lösenord har ändrats");
      });
    });
  });
});
