describe("Vouchers: create a batch", () => {
  before(() => {
    cy.visit("/");
    cy.intercept("POST", "**/api/vendors/**/vouchers", {
      body: { message: "10 new vouchers was created" },
      statusCode: 201,
    });
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
    cy.getCy("voucher-create").click();
    cy.get("body").click();
  });

  describe("UI", () => {
    it.only("is expected to route to '/dashboard/vouchers/create' ", () => {
      cy.location("pathname").should("eq", "/dashboard/vouchers/create");
    });
  });
});
