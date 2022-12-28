describe('Cookie Consent Banner', () => {

  beforeEach(() => {
    cy.rejectAllGDPR()
    cy.visit('/')
  });

  it('is expected to display the banner', () => {
    cy.getCy('cookie-banner').should('be.visible')
  });
  
  it('is expected to display the banner header', () => {
    cy.getCy('cookie-banner').should('contain.text', "We value your privacy")
  });
});