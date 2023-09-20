describe("User is authenticated using stored token", () => {
  before(() => {
  });
  
  beforeEach(() => {
    cy.fixture("authenticatedUserWithVendor.json").as("expectedUserData");
    cy.fixture("vendorWithoutAffiliates.json").as("expectedVendorData");
    cy.fixture("vouchersIndex").as("expectedVouchersData");
    cy.intercept("GET", "**/auth/validate_token**", {
      fixture: "authenticatedUserWithVendor.json",
    }).as("validateTokenCall");
    cy.intercept("GET", "**//api/vendors/**", {
      fixture: "vendorWithoutAffiliates.json",
    }).as("fetchVendor");
    cy.intercept("GET", "**/api/vendors/**/vouchers", {
      fixture: "vouchersIndex",
    }).as("fetchVouchersIndex");
    cy.visit("/");
    const values =
      '{"access-token":"pCTtJ6i-ZQOigaeRc8XuhQ", "uid":"user@mail.com"}';
    cy.setLocalStorage("auth-storage", values);
    
  });

  it("is expected to store currentUser in application state", () => {
    cy.wait("@validateTokenCall");
    cy.get("@expectedUserData").then((expectedUserData) => {
      cy.currentUserState().then((currentUser) => {
        expect(currentUser).to.deep.equal(expectedUserData);
      });
    });
  });

  it("is expected to store vendor in application state", () => {
    cy.wait("@fetchVendor");
    cy.get("@expectedVendorData").then((expectedVendorData) => {
      cy.vendorState().then((vendor) => {
        expect(vendor).to.deep.equal(expectedVendorData);
      });
    });
  });

  it("is expected to store vouchers in application state", () => {
    cy.wait("@fetchVouchersIndex");
    cy.get("@expectedVouchersData").then((expectedVouchersData) => {
      cy.vouchersState().then((vouchers) => {
        expect(vouchers).to.deep.equal(expectedVouchersData);
      });
    });
  });
});