describe("Activating a voucher", () => {
  before(() => {
    cy.visit("/");
    cy.fixture("venueCreateSuccess").then((fixture) => {
      cy.authenticateUser({
        ...fixture.vendor.users[1],
        vendor: fixture.vendor,
      });
      cy.applicationState().invoke("dispatch", {
        type: "user/setVenue",
        payload: fixture.vendor,
      });
    });
    cy.fixture("vouchersIndex").then((fixture) => {
      cy.applicationState().invoke("dispatch", {
        type: "user/setVouchers",
        payload: fixture.vouchers,
      });
    });
    cy.getCy("vouchers").click();
    cy.getCy("voucher-management").click();
    cy.get("body").click();
  });

    context("Inactive voucher", () => {
      beforeEach(() => {
        cy.getCy("voucher-status").click({ force: true }); // a bit hacky but it's a Chakra element and hard to get to 
        cy.getCy("CXuny").trigger("click");
        cy.getCy("CXuny-cta").trigger("click")
      });

      

      it("is expected to display action button", () => {
        cy.getCy("CXuny-cta").should("exist").and("contain.text", "Activate");
      });
    });

});
