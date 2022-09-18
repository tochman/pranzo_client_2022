describe("Authentication:", () => {
  before(() => {
    cy.visit("/");
  });
  describe("UI elements (CTA´s) with", () => {
    context("no currentUser", () => {
      it("is expected to show SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("exist").and("be.visible");
      });
      it("is expected to show SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("exist").and("be.visible");
      });
    });

    context("currentUser present", () => {
      before(() => {
        cy.authenticateUser({ name: "John Doe" });
      });
      it("is expected to show SignUp button in AppBar", () => {
        cy.getCy("sign-up-button").should("not.exist");
      });
      it("is expected to show SignIn button in AppBar", () => {
        cy.getCy("sign-in-button").should("not.exist");
      });
      it("is exprected to display currentUser´s name", () => {
        cy.getCy("user-name").should("contain.text", "John Doe");
      });
    });
  });
});
