describe("Affiliate handling", () => {

  describe('vendor with previous partners', () => {    
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
      cy.intercept("GET", "**/api/vendors/**", {
        fixture: "venueAfterAffiliateAddSuccess.json",
      });
      cy.intercept("POST", "**/api/vendors/**/affiliates", {
        fixture: "affiliateAddSuccess.json",
      }).as('addAffiliate');
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      });
  
      cy.getCy("my-venue").trigger("mouseover");
      cy.getCy("venue-details").click();
      cy.get("body").click();
      cy.getCy("affiliate-add-button").click();
      cy.getCy("email").type("info@wealllove.info");
      cy.getCy("submit").click();
    });

    it('is expected to make a call to the API', () => {
      cy.wait('@addAffiliate').its('request.method').should('equal', 'POST')
    });
  
    it("Is expected to display a success message", () => {
      cy.get('body').should('contain.text', "Your affiliate network has been expanded with The Place We All Love")
    });
  });

  describe('vendor without partners', () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("vendorWithoutAffiliates").then((fixture) => {
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
      cy.intercept("GET", "**/api/vendors/**", {
        fixture: "vendorAfterFirstAffiliateAddSuccess.json",
      });
      cy.intercept("POST", "**/api/vendors/**/affiliates", {
        fixture: "affiliateAddSuccess.json",
      }).as('addAffiliate');
      cy.intercept("POST", "**/api/validate_user", {
        fixture: "emailOk.json",
      });
  
      cy.getCy("my-venue").trigger("mouseover");
      cy.getCy("venue-details").click();
      cy.get("body").click();
      cy.getCy("affiliate-add-button").click();
      cy.getCy("email").type("info@wealllove.info");
      cy.getCy("submit").click();
    });

    it('is expected to make a call to the API', () => {
      cy.wait('@addAffiliate').its('request.method').should('equal', 'POST')
    });
  
    it("Is expected to display a success message", () => {
      cy.get('body').should('contain.text', "Your affiliate network has been expanded with The Place We All Love")
    });
  });
});
