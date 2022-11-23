describe("User can toggle application language", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Clicking on swedish flag icon", () => {
    it("is expected to change application language to SWEDISH", () => {
      cy.get("[data-cy=flag]").click();
      cy.get("[data-cy=footer]").within(() => {
        cy.contains("Klippkort och presentkort på ett enklare sätt").should(
          "exist"
        );
      });
    });
  });
});
