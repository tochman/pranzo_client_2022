describe("Application stucture", () => {
  it("is expected to have a root path", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
  });

  it("is expected to have a /auth path", () => {
    cy.visit("/auth");
    cy.location("pathname").should("eq", "/auth");
  });

  describe("is expected to have a /dashboard path", () => {
    it("accessible for an authenticated user", () => {
      cy.authenticateUser({
        name: "John Doe",
        vendor: { name: "The Other Place" },
      });
      cy.visit("/dashboard");
      cy.location("pathname").should("eq", "/dashboard");
    });

    it("restricted for a visitor - redirecting to /auth/sign-in", () => {
      cy.visit("/dashboard");
      cy.location("pathname").should("eq", "/auth/sign-in");
      cy.get('body').should('contain.text', "Please log in or register first.");
    });
  });
});
