describe("Vouchers view", () => {
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
    cy.getCy("eLtZr").trigger("click");
    cy.getCy("eLtZr-cta").trigger("click");
  });

  it("is expected to show modal", () => {
    cy.getCy("eLtZr-modal").should("exist")
  });
});
