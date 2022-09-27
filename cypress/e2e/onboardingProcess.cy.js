describe('Onboarding process', () => {

  beforeEach(() => {
    cy.visit('/')
    // cy.viewport('iphone-x')
    cy.getCy('join-pranzo-cta').trigger('click')
  });

  it('is expected to be fullfilled', () => {
    
  });
});