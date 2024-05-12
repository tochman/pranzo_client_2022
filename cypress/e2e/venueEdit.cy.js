describe("Venue edit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("venueCreateSuccess").then((fixture) => {
      cy.authenticateUser({
        ...fixture.vendor.users[1],
        vendor: fixture.vendor,
      });
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      }).as("checkEmail");
      cy.applicationStore().invoke("dispatch", {
        type: "user/setVenue",
        payload: fixture.vendor,
      });
      cy.intercept("PUT", "**/api/vendors/**", {
        fixture: "venueEditSuccess.json",
      }).as("venueEdit");
    });
  });

  describe("when accessed through the UI", () => {
    beforeEach(() => {
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
        cy.getCy("logotype").selectFile("cypress/fixtures/bjorsjoas_logo_old_black.png", {
          force: true,
        });
        cy.wait(500)
        cy.getCy("submit").click({ force: true });
      });

      it("is expected to make a network call on submit", () => {
        cy.wait("@venueEdit").its("request.method").should("eql", "PUT");
      });

      // This won't work with the current way of attaching the image in Cypress
      // it.only("is expected to set file name in fake input", () => {
      //   cy.getCy("logotypeFake").should('have.value', 'dummy.jpeg')
      // });

      it("is expected to include form data as params", () => {
        cy.wait("@venueEdit").then(({ request }) => {
          expect(request.body.vendor.name).to.eql("StarBugs");
          expect(request.body.vendor.description).to.eql(
            "A corporate chain with no charm...."
          );
          expect(request.body.vendor.primary_email).to.eql("info@starbugs.io");
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
        cy.location("pathname").should("eq", "/dashboard");
      });

      it("is expected to display vendor information", () => {
        cy.getCy("venue-info")
          .should("contain.text", "StarBugs")
          .and("contain.text", "A corporate chain with no charm....")
          .and("contain.text", "info@starbugs.io");
      });
    });
  });

  describe("when accessed through setup link for a user vith venue", () => {
    beforeEach(() => {
      cy.getCy("my-venue").trigger("mouseover");
      cy.getCy("venue-setup").click();
      cy.get("body").click();
    });

    it("is expected to display view on the dashboard path", () => {
      cy.location("pathname").should("eq", "/dashboard/venue/setup");
    });

    it("is expected to populate input fields with existing data", () => {
      cy.getCy("name").should("have.value", "The Other Place");
      cy.getCy("description").should(
        "have.value",
        "A friendly neighbourhood restaurant"
      );
      cy.getCy("email").should("have.value", "info@theotherplace.io");
    });
  });
});
