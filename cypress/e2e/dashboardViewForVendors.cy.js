describe("Dashboard view", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when accessed by an authenticated user (vendor)", () => {
    beforeEach(() => {
      cy.fixture("venueCreateSuccess").then((fixture) => {
        cy.authenticateUser({
          ...fixture.vendor.users[1],
          vendor: fixture.vendor,
        });
        cy.applicationStore().invoke("dispatch", {
          type: "user/setVenue",
          payload: fixture.vendor,
        });
      });
      cy.fixture("vouchersIndex").then((fixture) => {
        cy.applicationStore().invoke("dispatch", {
          type: "user/setVouchers",
          payload: fixture.vouchers,
        });
      });
    });

    it("is expected to display view on the dashboard path", () => {
      cy.location("pathname").should("eq", "/dashboard");
    });

    it("is expected to display a set of navigation links", () => {
      cy.getCy("navigation-bar").within(() => {
        cy.getCy("navigation-items").should("contain.text", "My venue");
      });
    });

    it("is expected to navigate to venue view", () => {
      cy.getCy("my-venue").trigger("mouseover");
      cy.getCy("venue-details").click();
      cy.get("body").click();
      cy.location("pathname").should("eq", "/dashboard");
    });
  });
});
