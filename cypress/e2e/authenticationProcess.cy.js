describe("Authentication:", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("initial UI elements (CTA´s) with", () => {
    context("no currentUser", () => {
      it("is expected to show SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("exist").and("be.visible");
      });
      it("is expected to show SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("exist").and("be.visible");
      });
    });

    context("currentUser present", () => {
      beforeEach(() => {
        cy.authenticateUser({ name: "John Doe" });
      });
      it("is expected to show SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("not.exist");
      });
      it("is expected to show SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("not.exist");
      });
      it("is exprected to display currentUser´s name", () => {
        cy.getCy("user-avatar").click();
        cy.getCy("user-name")
          .should("contain.text", "John Doe")
          .and("be.visible");
      });
    });
  });

  describe("by navigating to, ", () => {
    beforeEach("- ACTIONS intercept calls, navigate --", () => {
      cy.getCy("sign-up-button").click();
    });
    context("and submitting the registration form", () => {
      beforeEach("- ACTIONS fill in form --", () => {
        cy.intercept("POST", "**/auth", {
          fixture: "authenticatedUser.json",
        }).as("signUp");
        cy.intercept("POST", "**/auth/sign_in", {
          fixture: "authenticatedUser.json",
        }).as("signIn");
        cy.intercept("GET", "**/auth/validate_token", {
          fixture: "authenticatedUser.json",
          headers: { uid: "random.guy@mail.com" },
        });
        cy.getCy("create-account-form").within(() => {
          cy.getCy("name").type("Random Guy");
          cy.getCy("email").type("random.guy@email.com");
          cy.getCy("password").type("password");
          cy.getCy("password-conf").type("password");
          cy.get("[data-cy=submit]").click();
        });
      });
      it("is expected to make a network call on submit", () => {
        cy.wait("@signUp").its("request.method").should("eql", "POST");
      });

      it("is expected to include form data as params", () => {
        cy.wait("@signUp").then(({ request }) => {
          expect(request.body.name).to.eql("Random Guy");
          expect(request.body.email).to.eql("random.guy@email.com");
          expect(request.body.password).to.eql("password");
          expect(request.body.passwordConf).to.eql("password");
        });
      });

      it("is expected to store currentUser in application state", () => {
        cy.wait("@signUp");
        cy.applicationState()
          .invoke("getState")
          .its("user.currentUser")
          .should("not.be", "undefined")
          .and("be.an", "object");
      });

      it("is expected to redirect user to main view", () => {
        cy.location("pathname").should("eq", "/");
      });
    });
  });
});
