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
      before(() => {
        cy.authenticateUser({ name: "John Doe" });
      });
      it("is expected to show SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("not.exist");
      });
      it("is expected to show SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("not.exist");
      });
      it("is exprected to display currentUser´s name", () => {
        cy.getCy("user-name").should("contain.text", "John Doe");
      });
    });
  });

  describe("by navigating to, ", () => {
    beforeEach("- ACTIONS intercept calls, navigate --", () => {
      cy.intercept("POST", `${Cypress.env("apiUrl")}/auth**`, {
        fixture: "createAccountResponse.json",
      }).as("createAccount");
      cy.getCy("sign-up-button").click();
    });
    context("and submitting the registration form", () => {
      beforeEach("- ACTIONS fill in form --", () => {
        cy.getCy("create-account-form").within(() => {
          cy.getCy("name").type("Random Guy");
          cy.getCy("email").type("random.guy@email.com");
          cy.getCy("password").type("password");
          cy.getCy("password-conf").type("password");
          cy.get("[data-cy=submit]").click();
        });
      });
      it("is expected to make a network call on submit", () => {
        cy.wait("@createAccount").its("request.method").should("eql", "POST");
      });
  
      it("is expected to include form data as params", () => {
        cy.wait("@createAccount").then(({ request }) => {
          expect(request.body.params.name).to.eql("Random Guy");
          expect(request.body.params.email).to.eql("random.guy@email.com");
          expect(request.body.params.password).to.eql("password");
          expect(request.body.params.passwordConf).to.eql("password");
        });
      });
  
      it("is expected to store currentUser in application state", () => {
        cy.wait("@createAccount");
        cy.applicationState()
          .invoke("getState")
          .its("user.currentUser")
          .should("not.be", "undefined")
          .and("be.an", "object");
      });
  
      it.only("is expected to redirect user to main view", () => {
        cy.url().should("include", "/");
      });
    });

  });
});
