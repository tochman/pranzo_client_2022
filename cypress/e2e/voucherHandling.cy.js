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
  });

  describe("Clicking on the table row for vouchers", () => {
    context("Active vouchers with prior TRANSACTIONS", () => {
      beforeEach(() => {
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
        cy.getCy("voucher-status").click({ force: true }); // a bit hacky but it's a Chakra element and hard to get to 
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

  describe("using QR code scanner", () => {
    beforeEach(() => {
      cy.getCy("voucher-status").click({ force: true }); // this is needed due to previus test
      cy.getCy("scan").trigger("click");
    });

    it("is expected to filter the voucher", () => {
      cy.get("[data-cy=vouchers-index]>tbody")
        .children("tr")
        .should("have.length", 2)
        .and("contain.text", "izBgW");
    });
  });
});
