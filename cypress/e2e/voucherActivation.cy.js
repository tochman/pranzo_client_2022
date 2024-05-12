describe("Activating a voucher", () => {
  beforeEach(() => {
    cy.visit("/");
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
      cy.intercept("GET", "**/api/vendors/**/vouchers", {
        fixture: "vouchersIndexUpdated",
      });
      cy.getCy("CXuny").trigger("click");
      cy.getCy("CXuny-cta").trigger("click");
    });

    context("with an owner email", () => {
      beforeEach(() => {
        cy.getCy("email").type("new_client@random.com");
        cy.getCy("activate_wallet").click();
        cy.getCy("activate_pdf").click({ force: true });
        cy.getCy("submit-activation-form").click({ force: true });
      });
      afterEach(() => {
        cy.getCy("voucher-status").click();
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

    context("with an owner email and ENGLISH", () => {
      beforeEach(() => {
        cy.getCy("email").type("new_client@random.com");
        cy.getCy("activate_wallet").click();
        cy.getCy("activate_pdf").click({ force: true });
        cy.getCy("pdf_variant").within(() => {
          cy.contains("2").click();
        });
        cy.getCy("pdf_language").within(() => {
          cy.contains("English").click();
        });
        cy.getCy("submit-activation-form").click({ force: true });
      });
      afterEach(() => {
        cy.getCy("voucher-status").click();
      });

      describe("call to API", () => {
        it("is expected to make be a POST request", () => {
          cy.wait("@activateVoucher")
            .its("request.method")
            .should("eql", "PUT");
        });

        it("is expected to send options as params", () => {
          cy.wait("@activateVoucher").then(({ request }) => {
            expect(request.body.voucher.activate_pdf).to.eql(true);
            expect(request.body.voucher.activate_wallet).to.eql(true);
            expect(request.body.voucher.command).to.eql("activate");
            expect(request.body.voucher.email).to.eql("new_client@random.com");
            expect(request.body.voucher.pdf_options.variant).to.eql("2");
            expect(request.body.voucher.pdf_options.language).to.eql("en");
          });
        });

        it("is expected to return a success message", () => {
          cy.wait("@activateVoucher").then(({ response }) => {
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
