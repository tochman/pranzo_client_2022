describe('Vendor can setup a Venue', () => {

  beforeEach(() => {
    cy.visit('/dasboard')
    cy.authenticateUser({
      name: "John Doe",
    });
    cy.getCy('my-venue').trigger('mouseover')
    cy.getCy('venue-setup').click()
    cy.get('body').click()

  });
  it('is expected to navigate to the /dashboard/venue/setup path', () => {
    cy.location("pathname").should("eq", "/dashboard/venue/setup");
  });
  context('', () => {
    beforeEach(() => {
      
    });
    it('', () => {
      
    });
  });
});