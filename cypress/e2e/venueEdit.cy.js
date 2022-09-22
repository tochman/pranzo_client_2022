describe("Venue edit", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when accessed through the UI", () => {
    beforeEach(() => {
      cy.fixture("venueCreateSuccess").then((fixture) => {
        cy.authenticateUser({
          ...fixture.vendor.users[1],
          vendor: fixture.vendor,
        });
        cy.applicationState().invoke("dispatch", {
          type: "user/setVenue",
          payload: fixture.vendor,
        });
        cy.intercept("PUT", "**/api/vendors/**", {
          fixture: "venueEditSuccess.json",
        }).as("venueEdit");
      });
      cy.getCy("my-venue").trigger("mouseover");
      cy.getCy("venue-details").click();
      cy.get("body").click();
      cy.getCy("venue-edit-button").click();
    });
    it("is expected to display view on the dashboard path", () => {
      cy.location("pathname").should("eq", "/dashboard/venue/setup");
    });

    context("making edits", () => {
      beforeEach(() => {
        cy.getCy("name").clear().type("StarBugs");
        cy.getCy("description")
          .clear()
          .type("A corporate chain with no charm....");
        cy.getCy("email").clear().type("info@starbugs.io");
        cy.getCy("submit").click();
      });

      it("is expected to make a network call on submit", () => {
        cy.wait("@venueEdit").its("request.method").should("eql", "PUT");
      });

      it("is expected to include form data as params", () => {
        cy.wait("@venueEdit").then(({ request }) => {
          expect(request.body.name).to.eql("StarBugs");
          expect(request.body.description).to.eql(
            "A corporate chain with no charm...."
          );
          expect(request.body.primary_email).to.eql("info@starbugs.io");
        });
      });

      it("is expected to store vendor in application state", () => {
        cy.wait("@venueEdit");
        cy.window()
          .pipe((window) => window.store.getState().user.vendor)
          .should("not.be", "undefined")
          .and("be.an", "object");
      });

      it("is expected to redirect user to /dashboard view", () => {
        cy.location("pathname").should("eq", "/dashboard/venue");
      });

      it("is expected to display vendor information", () => {
        cy.getCy("venue-info")
          .should("contain.text", "StarBugs")
          .and("contain.text", "A corporate chain with no charm....")
          .and("contain.text", "info@starbugs.io");
      });
    });
  });
});
