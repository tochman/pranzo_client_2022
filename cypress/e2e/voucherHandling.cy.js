describe.only('', () => {

  beforeEach(() => {
    cy.visit('/')
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
    cy.getCy('vouchers').click()
    cy.getCy('voucher-management').click()
    cy.get('body').click()
  });


  it('is expected to reveal transactions for voucher', () => {
    
  });
});