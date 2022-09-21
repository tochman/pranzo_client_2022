describe("Dashboard view", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when accessed by an authenticated user (vendor)", () => {
    beforeEach(() => {
      cy.authenticateUser({
        name: "John Doe",
        vendor: { name: "The Other Place" },
      });
    });
    it("is expected to display view on the dashboard path", () => {
      cy.location("pathname").should("eq", "/dashboard");
    });

    it("is expected to display a set of navigation links", () => {
      cy.getCy('navigation-bar').within(()=>{
        cy.getCy('navigation-items').should('contain.text', 'My venue')
      })
    });
  });
});
