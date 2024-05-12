describe("Creating a transaction on affiliate voucher", () => {
  before(() => {
    cy.intercept("GET", "**/auth/validate_token**", {
      fixture: "authenticatedUser.json",
    }).as("validateTokenCall");
    cy.visit("/");
    const values =
      '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    cy.setLocalStorage("auth-storage", values);

    cy.fixture("venueCreateSuccess").then((fixture) => {
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
  });

  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullAffiliateCardTransaction.json",
      }).as("createTransaction");
      cy.getCy("vouchers").click();
      cy.getCy("voucher-management").click();
      cy.get("body").click();
      cy.getCy("qwerty").click();
      cy.getCy("qwerty-cta").click();
      cy.getCy("transaction-amount").type("250");
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
          expect(request.body.honored_by).to.eql(100);
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

      it("is expected to display the updated value of voucher in the main table", () => {
        cy.wait("@createTransaction");
        cy.getCy("qwerty").should("contain.text", "650");
      });
    });

    describe("the transactions table", () => {
      beforeEach(() => {
        cy.getCy("qwerty").trigger("click");
      });
      it("is expected to reveal transactions for voucher", () => {
        cy.get("[data-cy=qwerty-table]>table>tbody")
          .children("tr")
          .should("have.length", 2);
      });
    });
  });
});
