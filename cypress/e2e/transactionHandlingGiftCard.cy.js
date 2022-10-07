describe("Creating a transaction", () => {
  before(() => {
    cy.intercept("GET", "**/auth/validate_token**", {
      fixture: "authenticatedUser.json",
    }).as("validateTokenCall");
    cy.visit("/");
    const values =
      '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    cy.setLocalStorage("J-tockAuth-Storage", values);

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

  beforeEach(() => {
    cy.getCy("vouchers").click();
    cy.getCy("voucher-management").click();
    cy.get("body").click()
    cy.getCy("Dqbnc").click()
    cy.getCy("Dqbnc-cta").click()
  });

  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullGiftCardTransaction.json",
      }).as("createTransaction");
      cy.getCy('transaction-amount').type('250')
      cy.getCy("Dqbnc-create-transaction").click();
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

      it('is expected to display the updated value of voucher in the main table', () => {
        cy.wait("@createTransaction")
        cy.getCy('Dqbnc').should('contain.text', '7')
      });
    });

    describe("the transactions table", () => {
      beforeEach(() => {
        cy.getCy("Dqbnc").trigger("click");
      });
      it("is expected to reveal transactions for voucher", () => {
        cy.get("[data-cy=Dqbnc-table]>table>tbody")
          .children("tr")
          .should("have.length", 1)
          .and("contain.text", "September 29, 2022")
          .and("contain.text", "Servings: 1");
      });
    });


  });
});
