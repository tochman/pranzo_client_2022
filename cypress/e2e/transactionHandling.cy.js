describe("Vouchers view", () => {
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

    cy.getCy("vouchers").click();
    cy.getCy("voucher-management").click();
    cy.getCy("eLtZr").trigger("click");
    cy.getCy("eLtZr-cta").trigger("click");
  });

  it("is expected to show modal", () => {
    cy.getCy("eLtZr-modal").should("exist");
  });

  describe('clicking on "Create transaction"', () => {
    beforeEach(() => {
      cy.intercept("POST", "**/vendors/**/vouchers/**/transactions", {
        fixture: "sucessfullTransaction.json",
      }).as("createTransaction");
      cy.getCy("eLtZr-create-transaction").click();
    });

    describe.only("the Modal", () => {
      it("is expected to be hidden", () => {
        cy.getCy("eLtZr-modal").should("not.exist");
      });
    });
    describe("call to API", () => {
      it("is expected to make be a POST request", () => {
        cy.wait("@createTransaction")
          .its("request.method")
          .should("eql", "POST");
      });

      it("is expected to return a sussess message", () => {
        cy.wait("@createTransaction").then(({ request, response }) => {
          expect(response.body).to.have.own.property(
            "message",
            "Voucher eLtZr was updated with a new transaction"
          );
        });
      });
    });
  });
});
