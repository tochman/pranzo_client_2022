describe('Onboarding process', () => {
// This testfile is used for visual development only
// Not relevant for actual testing and excluded from all.cy.js
  beforeEach(() => {
    cy.visit('/')
    // cy.viewport('iphone-x')
    cy.getCy('join-pranzo-cta').trigger('click')
  });

  it('is expected to be fullfilled', () => {
    
  });
});