describe("Vendor can setup a Venue", () => {
  beforeEach(() => {
    cy.visit("/dasboard");
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
      cy.intercept("POST", "**/api/vendors", {
        fixture: "venueCreateSuccess.json",
      }).as("venueCreate");
      cy.getCy("name").type("The Other Place");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
      cy.getCy("submit").click();
    });
    it("is expected to make a network call on submit", () => {
      cy.wait("@venueCreate").its("request.method").should("eql", "POST");
    });

    it("is expected to include form data as params", () => {
      cy.wait("@venueCreate").then(({ request }) => {
        expect(request.body.name).to.eql("The Other Place");
        expect(request.body.description).to.eql(
          "A friendly neighbourhood restaurant"
        );
        expect(request.body.primary_email).to.eql("info@theotherplace.io");
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
      cy.location("pathname").should("eq", "/dashboard/venue");
    });

    it('is expected to display vendor information', () => {
      cy.getCy('venue-info').should('contain.text', 'The Other Place')
    });
  });

  context("on Network Error", () => {
    beforeEach(() => {
      cy.authenticateUser({
        name: "John Doe",
      });
      cy.intercept("POST", "**/api/vendors", { statusCode: 500 }).as(
        "vendorCreateError"
      );
      cy.getCy("name").type("The Other Place");
      cy.getCy("description").type("A friendly neighbourhood restaurant");
      cy.getCy("email").type("info@theotherplace.io");
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
