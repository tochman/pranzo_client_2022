describe("Vendor can setup a Venue", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
    cy.authenticateUser({
      name: "John Doe",
    });
    cy.getCy("my-venue").trigger("mouseover");
    cy.getCy("venue-setup").click();
    cy.get("body").click();
  });
  it("is expected to navigate to the /dashboard/venue/setup path", () => {
    cy.location("pathname").should("eq", "/dashboard/venue/setup");
  });
  context("filling in the registration form", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      }).as("checkEmail");
      cy.intercept("POST", "**/api/vendors", {
        fixture: "venueCreateSuccess.json",
      }).as("venueCreate");
      cy.getCy("name").type("The Other Place");
      cy.getCy("vat_id").type("SE999999999901");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
      cy.get("body").click();
      cy.wait(1000);
      cy.getCy("submit").click({ force: true });
    });

    it("is expected to make a call to API and check email", () => {
      cy.wait("@checkEmail").its("request.method").should("eql", "POST");
    });

    it("is expected to make a network call on submit", () => {
      cy.wait("@venueCreate").its("request.method").should("eql", "POST");
    });

    it("is expected to include form data as params", () => {
      cy.wait("@venueCreate").then(({ request }) => {
        expect(request.body.vendor.name).to.eql("The Other Place");
        expect(request.body.vendor.description).to.eql(
          "A friendly neighbourhood restaurant"
        );
        expect(request.body.vendor.primary_email).to.eql("info@theotherplace.io");
      });
    });

    it("is expected to store vendor in application state", () => {
      cy.wait("@venueCreate");
      cy.window()
        .pipe((window) => window.store.getState().user.vendor)
        .should("not.be", "undefined")
        .and("be.an", "object");
    });

    it("is expected to redirect user to /dashboard view", () => {
      cy.location("pathname").should("eq", "/dashboard");
    });

    it("is expected to display vendor information", () => {
      cy.getCy("venue-info").should("contain.text", "The Other Place");
    });
  });

  context("using an email that is taken", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailConflict.json",
      }).as("checkEmail");
      cy.intercept("POST", "**/api/vendors", {
        fixture: "venueCreateSuccess.json",
      }).as("venueCreate");
      cy.getCy("name").type("The Other Place");
      cy.getCy("vat_id").type("SE999999999901");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
      cy.get("body").click(); // clicking away from the field
      // cy.getCy("submit").click({ force: true }); // still not sure about this
    });

    it("is expected to make a call to API and check email", () => {
      cy.wait("@checkEmail").its("request.method").should("eql", "POST");
    });

    it("is expected to display error message", () => {
      cy.wait("@checkEmail").then(()=> {
        cy.get("body").should(
          "contain.text",
          "This email needs to be unique, please use another one...."
        );
      })
    });
  });

  context("VAT number validation", () => {
    beforeEach(() => {
      cy.authenticateUser({
        name: "John Doe",
      });
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      }).as("checkEmail");
      cy.intercept("POST", "**/api/vendors", { statusCode: 500 }).as(
        "vendorCreateError"
      );
      cy.getCy("name").type("The Other Place");
      cy.getCy("vat_id").type("999999-9999");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
      cy.get("body").click(); // clicking away from the field

      cy.wait('@checkEmail')
      cy.getCy("submit").click({ force: true });
    });

    it("is expected to display an error message", () => {
      cy.get("body").should(
        "contain.text",
        "You entered the VAT number in an invalid format."
      );
    });
  });

  context("on Network Error", () => {
    beforeEach(() => {
      cy.authenticateUser({
        name: "John Doe",
      });
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      }).as("checkEmail");
      cy.intercept("POST", "**/api/vendors", { statusCode: 500 }).as(
        "vendorCreateError"
      );
      cy.getCy("name").type("The Other Place");
      cy.getCy("vat_id").type("SE999999999901");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
      cy.get("body").click(); // clicking away from the field

      cy.wait('@checkEmail')
      cy.getCy("submit").click();
    });

    it("is expected to display an error message", () => {
      cy.get("body").should(
        "contain.text",
        "Request failed with status code 500. Please try again."
      );
    });
  });
});
