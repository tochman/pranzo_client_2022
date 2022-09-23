describe.only('Navigating the application on MOBILE device', () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-x");
    cy.getCy("mobile-nav-toggle").trigger("click");
  });

  describe.only('Logo link', () => {
    before(()=>{
      cy.visit('/auth/sign-up')
      cy.getCy('mobile-logo').trigger('click')
    })

    it('is expected to navigate to root path', () => {
      cy.location("pathname").should("eq", "/");

    });
  });
  describe('as a VISITOR', () => {
    context('Sign Up Process', () => {
      beforeEach(() => {
        cy.getCy("sign-up-button-mobile").trigger("click");
      });
      
      it('is expected to navigate to auth/sign-up', () => {
        cy.location("pathname").should("eq", "/auth/sign-up");
      });
    });

    context('Login Process', () => {
      beforeEach(() => {
        cy.getCy("sign-in-button-mobile").trigger("click");
      });
      
      it('is expected to navigate to auth/sign-up', () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });
    });
  });

  describe("as an AUTHENTICATED user WITH venue", () => {
    beforeEach(() => {
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
      cy.getCy("my-venue-mobile").trigger('click')
    });

    context('navigating to Venue Details', () => {
      beforeEach(() => {
        cy.getCy("venue-details-mobile").trigger('click')
      });
      it("is expected to navigate to /dashboard/venue", () => {
        cy.location("pathname").should("eq", "/dashboard/venue");
      });
    });

    context('navigating to Venue Setup', () => {
      beforeEach(() => {
        cy.getCy("venue-setup-mobile").trigger('click')
      });
      it("is expected to navigate to /dashboard/venue", () => {
        cy.location("pathname").should("eq", "/dashboard/venue/setup");
      });
    });

  });
});