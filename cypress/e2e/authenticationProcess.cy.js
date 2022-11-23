describe("Authentication:", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "**/hooks.slack.com/services/**", {
      body: { message: "ok" },
      statusCode: 200,
    }).as('slackHook');
  });

  describe("logging out from the application", () => {
    beforeEach(() => {
      cy.authenticateUser({ name: "John Doe" });
      cy.getCy("user-avatar").click();
      cy.getCy("end-session").click();
      cy.wait(1000);
    });

    it("is expected to show SignUp button in AppBar", () => {
      cy.getCy("sign-up-button").should("exist").and("be.visible");
    });
    it("is expected to show SignIn button in AppBar", () => {
      cy.getCy("sign-in-button").should("exist").and("be.visible");
    });

    it("is expected to clear currentUser from application state", () => {
      cy.window()
        .pipe((window) => window.store.getState().user.currentUser)
        .should("eql", null);
    });
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

    context("token is stored in localStorage", () => {
      beforeEach(() => {
        cy.intercept("GET", "**/auth/validate_token**", {
          fixture: "authenticatedUser.json",
        }).as("validateTokenCall");
        cy.visit("/");
        const values =
          '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
        cy.setLocalStorage("auth-storage", values);
      });

      it("is expected to hide SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("not.exist");
      });

      it("is expected to hide SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("not.exist");
      });

      it("is exprected to display currentUser´s name", () => {
        cy.getCy("user-avatar").click();
        cy.getCy("user-name")
          .should("contain.text", "Kalle Andersson")
          .and("be.visible");
      });
    });

    context("currentUser present", () => {
      beforeEach(() => {
        cy.authenticateUser({ name: "John Doe" });
      });
      it("is expected to hide SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("not.exist");
      });
      it("is expected to hide SignIn button in AppBar", () => {
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

  describe("by navigating to SINGN-UP, ", () => {
    beforeEach("- ACTIONS intercept calls, navigate --", () => {
      cy.getCy("sign-up-button").click();
    });
    context("and submitting an VALID registration form", () => {
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

      it.only("is expected to make a network call on submit", () => {
        cy.wait("@slackHook").its("request.method").should("eql", "POST");
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
        cy.window()
          .pipe((window) => window.store.getState().user.currentUser)
          .should("not.be", "undefined")
          .and("be.an", "object");
      });

      it("is expected to redirect user to /dashboard view", () => {
        cy.location("pathname").should("eq", "/dashboard");
      });
    });

    context("and submitting an INVALID registration form", () => {
      beforeEach("- ACTIONS fill in form --", () => {
        cy.intercept("POST", "**/auth", {
          fixture: "authenticationError.json",
          statusCode: 422,
        }).as("failedSignUp");

        cy.getCy("create-account-form").within(() => {
          cy.getCy("name").type("Random Guy");
          cy.getCy("password").type("password");
          cy.getCy("password-conf").type("password");
          cy.get("[data-cy=submit]").click();
        });
      });

      it("is expected to remain on the sign-up view", () => {
        cy.location("pathname").should("eq", "/auth/sign-up");
      });

      it("is expected to display an error message", () => {
        cy.get("body").should("contain.text", "This field is required");
      });
    });
  });

  describe("by navigating to SINGN-IN, ", () => {
    beforeEach("- ACTIONS intercept calls, navigate --", () => {
      cy.getCy("sign-in-button").click();
    });
    context("and submitting an VALID registration form", () => {
      beforeEach("- ACTIONS fill in form --", () => {
        cy.intercept("POST", "**/auth/sign_in", {
          fixture: "authenticatedUser.json",
        }).as("signIn");
        cy.intercept("GET", "**/auth/validate_token", {
          fixture: "authenticatedUser.json",
          headers: { uid: "random.guy@mail.com" },
        });
        cy.getCy("sign-in-form").within(() => {
          cy.getCy("email").type("random.guy@email.com");
          cy.getCy("password").type("password");
          cy.get("[data-cy=submit]").click();
        });
      });
      it("is expected to make a network call on submit", () => {
        cy.wait("@signIn").its("request.method").should("eql", "POST");
      });

      it("is expected to include form data as params", () => {
        cy.wait("@signIn").then(({ request }) => {
          expect(request.body.email).to.eql("random.guy@email.com");
          expect(request.body.password).to.eql("password");
        });
      });

      it("is expected to store currentUser in application state", () => {
        cy.wait("@signIn");
        cy.window()
          .pipe((window) => window.store.getState().user.currentUser)
          .should("not.be", "undefined")
          .and("be.an", "object");
      });

      it("is expected to redirect user to dashboard view", () => {
        cy.location("pathname").should("eq", "/dashboard");
      });
    });

    context("and submitting an INVALID sign in form", () => {
      beforeEach("- ACTIONS fill in form --", () => {
        cy.intercept("POST", "**/auth/sign_in", {
          fixture: "signUpAuthenticationError.json",
          statusCode: 422,
        }).as("failedSignIn");

        cy.getCy("sign-in-form").within(() => {
          cy.getCy("email").type("random.guy@mail.com");
          cy.getCy("password").type("WRONG-PASSWORD");
          cy.get("[data-cy=submit]").click();
        });
      });

      it("is expected to make a network call on submit", () => {
        cy.wait("@failedSignIn").its("request.method").should("eql", "POST");
      });

      it("is expected to include form data as params", () => {
        cy.wait("@failedSignIn").then(({ request }) => {
          expect(request.body.email).to.eql("random.guy@mail.com");
          expect(request.body.password).to.eql("WRONG-PASSWORD");
        });
      });

      it("is expected to display sign in form", () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });

      it("is expected to display an error message", () => {
        cy.get("body").should(
          "contain.text",
          "Invalid login credentials. Please try again."
        );
      });
    });
  });
});
