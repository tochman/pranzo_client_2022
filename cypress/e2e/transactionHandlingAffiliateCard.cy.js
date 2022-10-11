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

  
  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullAffiliateCardTransaction.json",
      }).as("createTransaction");
      cy.getCy("vouchers").click();
      cy.getCy("voucher-management").click();
      cy.get("body").click()
      cy.getCy("qwerty").click()
      cy.getCy("qwerty-cta").click()
      cy.getCy('transaction-amount').type('250')
      cy.getCy("qwerty-create-transaction").click();
    });

    describe("Flash message", () => {
      it("is expected to be displayed", () => {
        cy.get("body").should(
          "contain.text",
          "Voucher qwerty was updated with a new transaction"
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
            "Voucher qwerty was updated with a new transaction"
          );
        });
      });

      it('is expected to display the updated value of voucher in the main table', () => {
        cy.wait("@createTransaction")
        cy.getCy('qwerty').should('contain.text', '650')
      });
    });

    describe("the transactions table", () => {
      beforeEach(() => {
        cy.getCy("qwerty").trigger("click");
      });
      it.only("is expected to reveal transactions for voucher", () => {
        cy.get("[data-cy=qwerty-table]>table>tbody")
          .children("tr")
          .should("have.length", 2)
      });
    });

  });

  // describe("depleted card", () => {
  //   beforeEach(() => {
  //     cy.fixture("vouchersIndexWithDepletedCashAndServings").then((fixture) => {
  //       cy.applicationState().invoke("dispatch", {
  //         type: "user/setVouchers",
  //         payload: fixture.vouchers,
  //       });
  //     });
  //     cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
  //       fixture: "voucherValueExceeded.json", statusCode: 422
  //     }).as("createTransaction");
  //     cy.getCy("vouchers").click();
  //     cy.getCy("voucher-management").click();
  //     cy.get("body").click();
  //     cy.getCy("67890").click();
  //     cy.getCy("67890-cta").click();
  //     cy.getCy("67890-create-transaction").click();
  //   });

  //   it("is expected to make be a POST request", () => {
  //     cy.wait("@createTransaction").its("request.method").should("eql", "POST");
  //   });

  //   it("is expected to return a error message", () => {
  //     cy.wait("@createTransaction").then(({ response }) => {
  //       expect(response.body).to.have.own.property(
  //         "message",
  //         "Voucher limit exceeded"
  //       );
  //     });
  //   });
  // });
});
