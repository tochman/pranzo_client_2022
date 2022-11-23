describe("MOBILE: Vouchers view", () => {
  before(() => {
    cy.viewport("iphone-x");
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
    cy.getCy("mobile-nav-toggle").trigger("click");
    cy.getCy("vouchers-mobile").click();
    cy.getCy("voucher-management-mobile").click();
    cy.get("body").click();
  });

  describe("Clicking on the table row for vouchers", () => {
    context("Active vouchers with prior TRANSACTIONS", () => {
      beforeEach(() => {
        cy.viewport("iphone-x");
        cy.getCy("eLtZr").trigger("click");
      });

      it("is expected to reveal transactions for voucher", () => {
        cy.getCy("eLtZr-table").should("exist").and("be.visible");
      });

      it("is expected to display holder information", () => {
        cy.getCy("eLtZr-holder").should(
          "contain.text",
          "Owner: random@random.com"
        );
      });

      it("is expected to display action button", () => {
        cy.getCy("eLtZr-cta")
          .should("exist")
          .and("contain.text", "Create transaction");
      });
    });

    context("Active vouchers without prior TRANSACTIONS", () => {
      beforeEach(() => {
        cy.viewport("iphone-x");
        cy.getCy("Dqbnc").trigger("click");
      });

      it("is expected to reveal transactions for voucher", () => {
        cy.getCy("Dqbnc-table").should("not.exist");
      });

      it("is expected to display holder information", () => {
        cy.getCy("Dqbnc-holder").should("contain.text", "Owner: holder of card");
      });

      it("is expected to display action button", () => {
        cy.getCy("Dqbnc-cta")
          .should("exist")
          .and("contain.text", "Create transaction");
      });
    });

    context("Inactive voucher", () => {
      beforeEach(() => {
        cy.viewport("iphone-x");
        cy.getCy('voucher-status').click()
        cy.getCy("CXuny").trigger("click");
      });

      it("is expected to reveal transactions for voucher", () => {
        cy.getCy("CXuny-table").should("not.exist");
      });

      it("is expected to display holder information", () => {
        cy.getCy("CXuny-holder").should("not.exist");
      });

      it("is expected to display action button", () => {
        cy.getCy("CXuny-cta").should("exist").and("contain.text", "Activate");
      });
    });
  });
});
