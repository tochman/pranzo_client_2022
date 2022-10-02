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
    cy.getCy("eLtZr").trigger("click");
    cy.get("body").trigger("click");
    cy.getCy("eLtZr-cta").trigger("click");
  });

  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullTransaction.json",
      }).as("createTransaction");
      cy.getCy("eLtZr-create-transaction").click();
    });

    describe("call to API", () => {
      it("is expected to make be a POST request", () => {
        cy.wait("@createTransaction")
          .its("request.method")
          .should("eql", "POST");
      });

      it("is expected to return a success message", () => {
        cy.wait("@createTransaction").then(({ request, response }) => {
          expect(response.body).to.have.own.property(
            "message",
            "Voucher eLtZr was updated with a new transaction"
          );
        });
      });

      it('is expected to display the updated value of voucher in the main table', () => {
        cy.wait("@createTransaction")
        cy.getCy('eLtZr').should('contain.text', '7')
      });
    });

    describe("the transactions table", () => {
      beforeEach(() => {
        cy.getCy("eLtZr").trigger("click");
      });
      it("is expected to reveal transactions for voucher", () => {
        cy.get("[data-cy=eLtZr-table]>table>tbody")
          .children("tr")
          .should("have.length", 2)
          .and("contain.text", "September 27, 2022")
          .and("contain.text", "Servings: 1");
      });
    });

    describe("the Modal", () => {
      it("is expected to be hidden", () => {
        cy.getCy("eLtZr-modal").should("not.exist");
      });
    });

    describe("Flash message", () => {
      it("is expected to be displayed", () => {
        cy.get("body").should(
          "contain.text",
          "Voucher eLtZr was updated with a new transaction"
        );
      });
    });
  });
});
