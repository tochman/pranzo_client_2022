describe("Creating a transaction", () => {
  before(() => {
    cy.intercept("GET", "**/auth/validate_token**", {
      fixture: "authenticatedUser.json",
    }).as("validateTokenCall");
    cy.visit("/");
    const values =
      '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    cy.setLocalStorage("auth-storage", values);

    cy.fixture("venueCreateSuccess").then((fixture) => {
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
  });

  beforeEach(() => {});

  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullGiftCardTransaction.json",
      }).as("createTransaction");
      cy.getCy("vouchers").click();
      cy.getCy("voucher-management").click();
      cy.get("body").click();
      cy.getCy("Dqbnc").click({ force: true });
      cy.getCy("Dqbnc-cta").click({ force: true });
      cy.getCy("transaction-amount").type("250");
      cy.getCy("Dqbnc-create-transaction").click({ force: true });
    });

    describe("Flash message", () => {
      it("is expected to be displayed", () => {
        cy.get("body").should(
          "contain.text",
          "Voucher Dqbnc was updated with a new transaction"
        );
      });
    });

    describe("call to API", () => {
      it("is expected to make be a POST request", () => {
        cy.wait("@createTransaction")
          .its("request.method")
          .should("eql", "POST");
      });

      it("is expected to include value as params", () => {
        cy.wait("@createTransaction").then(({ request }) => {
          expect(request.body.value).to.eql(250);
        });
      });

      it("is expected to return a success message", () => {
        cy.wait("@createTransaction").then(({ request, response }) => {
          expect(response.body).to.have.own.property(
            "message",
            "Voucher Dqbnc was updated with a new transaction"
          );
        });
      });

      it("is expected to display the updated value of voucher in the main table", () => {
        cy.wait("@createTransaction");
        cy.getCy("Dqbnc").should("contain.text", "7");
      });
    });

    describe("the transactions table", () => {
      beforeEach(() => {
        cy.getCy("Dqbnc").click({ force: true });
      });

      it("is expected to reveal transaction details for voucher", () => {
        cy.get("[data-cy=Dqbnc-table]>table>tbody>tr")
          .children("td")
          .should("have.length", 2);
      });

      it("is expected to reveal transaction details for voucher", () => {
        cy.get("[data-cy=Dqbnc-table]>table>tbody>tr")
          .children("td")
          .first()
          .should("contain.text", "September 29, 2022");
      });
    });
  });

  describe("depleted card", () => {
    beforeEach(() => {
      cy.fixture("vouchersIndexWithDepletedCashAndServings").then((fixture) => {
        cy.applicationState().invoke("dispatch", {
          type: "user/setVouchers",
          payload: fixture.vouchers,
        });
      });
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "voucherValueExceeded.json",
        statusCode: 422,
      }).as("createTransaction");
      cy.getCy("vouchers").click();
      cy.getCy("voucher-management").click();
      cy.get("body").click();
      cy.getCy("67890").click();
      cy.getCy("67890-cta").click();
      cy.getCy("67890-create-transaction").click();
    });

    it("is expected to make be a POST request", () => {
      cy.wait("@createTransaction").its("request.method").should("eql", "POST");
    });

    it("is expected to return a error message", () => {
      cy.wait("@createTransaction").then(({ response }) => {
        expect(response.body).to.have.own.property(
          "message",
          "Voucher limit exceeded"
        );
      });
    });
  });
});
