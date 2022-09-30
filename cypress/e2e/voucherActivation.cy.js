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
    cy.getCy("voucher-status").click({ force: true }); // a bit hacky but it's a Chakra element and hard to get to
  });

  describe("UI", () => {
    it("is expected to display action button", () => {
      cy.getCy("CXuny-cta").should("exist").and("contain.text", "Activate");
    });
  });

  context("Inactive voucher", () => {
    beforeEach(() => {
      cy.intercept("PUT", "**/vendors/**/vouchers/**", {
        fixture: "voucherActivationResponse.json",
      }).as("activateVoucher");
      cy.getCy("CXuny").trigger("click");
      cy.getCy("CXuny-cta").trigger("click");
    });

    context("with an owner email", () => {
      beforeEach(() => {
        cy.getCy("email").type("new_client@random.com");
        cy.getCy("submit-activation-form").click({ force: true });
      });

      describe("call to API", () => {
        it("is expected to make be a POST request", () => {
          cy.wait("@activateVoucher")
            .its("request.method")
            .should("eql", "PUT");
        });
  
        it("is expected to return a success message", () => {
          cy.wait("@activateVoucher").then(({ request, response }) => {
            expect(response.body).to.have.own.property(
              "message",
              "Voucher is now active"
            );
          });
        });
      });
    });
  });
});
