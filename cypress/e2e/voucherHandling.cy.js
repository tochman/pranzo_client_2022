describe('', () => {

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

  describe('Clickeng on the table row for vouchers', () => {

    context.only('Active with prior TRANSACTIONS', () => {
      beforeEach(() => {
        cy.getCy('eLtZr').trigger('click')
      });

      it('is expected to reveal transactions for voucher', () => {
        cy.getCy('eLtZr-table').should('exist').and('be.visible')
      });

      it('is expected to display holder information', () => {
        cy.getCy('eLtZr-holder').should('contain.text', 'Holder: random@random.com')
      });

      it('is expected to display action button', () => {
        cy.getCy('eLtZr-cta').should('exist').and('contain.text', 'Create transaction')
      });
      
    });
    
  });

});