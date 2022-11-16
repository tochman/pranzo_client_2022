describe('Reset Password process', () => {

  beforeEach(() => {
    cy.visit('/auth/sign-in')
  });

  context('Step 1: request password reset', () => { 
    beforeEach(() => {
      cy.getCy('reset-password').click()
    });  

    it('is expected to navigate to reset password view', () => {
      cy.location("pathname").should("eq", "/auth/reset-password");
    });
  });
});