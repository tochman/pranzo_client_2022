describe("Application stucture", () => {
  it("is expected to have a root path", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
  });

  it.only("is expected to have a /auth/sign-in path", () => {
    cy.visit("/auth/sign-in");
    cy.location("pathname").should("eq", "/auth/sign-in");
    cy.title().should('eql', 'PRANZO - Log in')
  });

  it("is expected to have a /auth/sign-up path", () => {
    cy.visit("/auth/sign-up");
    cy.location("pathname").should("eq", "/auth/sign-up");
    cy.title().should('eql', 'PRANZO - Create an account')
  });

  it('is expected to have a /join-pranzo path', () => {
    cy.visit('/join-pranzo')
    cy.location("pathname").should("eq", "/join-pranzo");
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
    });
  });

  describe("For authenticated user WITH venue", () => {
    beforeEach("Authenticate and visit app", () => {
      cy.visit("/");
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
    });

    it("is expected to display menue items", () => {
      cy.getCy("my-venue").should("exist").and("be.visible");
      cy.getCy("vouchers").should("exist").and("be.visible"); //refactor to it's own it block?
    });

    context("pull down contains menu items", () => {
      beforeEach(() => {
        cy.getCy("my-venue").trigger("mouseover");
      });
      it("is expected to display Edit Venue", () => {
        cy.getCy("venue-setup")
          .should("exist")
          .and("contain.text", "Edit your venue")
          .and("be.visible");
      });

      it("is expected to display Venue Details", () => {
        cy.getCy("venue-details").should("exist").and("be.visible");
      });
    });
  });

  describe("For authenticated user WITHOUT venue", () => {
    beforeEach("Authenticate and visit app", () => {
      cy.visit("/");
      cy.fixture("venueCreateSuccess").then((fixture) => {
        cy.authenticateUser({
          ...fixture.vendor.users[1],
          vendor: null,
        });
      });
    });

    it("is expected to display menue items", () => {
      cy.getCy("my-venue").should("exist").and("be.visible");
    });

    it('is expected to hide Vouchers menue item', () => {
      cy.getCy("vouchers").should("not.exist")
    });

    context("pull down contains menu items", () => {
      beforeEach(() => {
        cy.getCy("my-venue").trigger("mouseover");
      });
      it("is expected to display Setup Venue", () => {
        cy.getCy("venue-setup")
          .should("exist")
          .and("contain.text", "Setup your venue")
          .and("be.visible");
      });

      it("is expected to hide Venue Details", () => {
        cy.getCy("venue-details").should("not.exist");
      });
    });
  });

  describe("MOBILE VIEW: For visitors", () => {
    beforeEach("Authenticate, visit app and open navigation", () => {
      cy.visit("/");
      cy.viewport("iphone-x");
      cy.getCy("mobile-nav-toggle").trigger("click");
    });

    it("is expected to display menue items", () => {
      cy.getCy("nothing-to-see").should("exist").and("be.visible");
    });
  });

  describe("MOBILE VIEW: For authenticated user WITH venue", () => {
    beforeEach("Authenticate, visit app and open navigation", () => {
      cy.visit("/");
      cy.viewport("iphone-x");
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
      cy.getCy("mobile-nav-toggle").trigger("click");
    });

    it("is expected to display menue items", () => {
      cy.getCy("my-venue-mobile").should("exist").and("be.visible");
      cy.getCy("vouchers-mobile").should("exist").and("be.visible");
    });

    context("pull down contains menu items", () => {
      beforeEach(() => {
        cy.getCy("my-venue-mobile").trigger("click");
      });
      it("is expected to display Edit Venue", () => {
        cy.getCy("venue-setup-mobile")
          .should("exist")
          .and("contain.text", "Edit your venue")
          .and("be.visible");
      });

      it("is expected to display Venue Details", () => {
        cy.getCy("venue-details-mobile")
          .should("exist")
          .and("be.visible")
          .and("contain.text", "Venue details");
      });
    });
  });

  describe("MOBILE VIEW For authenticated user WITHOUT venue", () => {
    beforeEach("Authenticate, visit app and open navigation", () => {
      cy.visit("/");
      cy.viewport("iphone-x");
      cy.fixture("venueCreateSuccess").then((fixture) => {
        cy.authenticateUser({
          ...fixture.vendor.users[1],
          vendor: null,
        });
      });
      cy.getCy("mobile-nav-toggle").trigger("click");
    });

    it("is expected to display menue items", () => {
      cy.getCy("my-venue-mobile").should("exist").and("be.visible");
    });

    it('is expected to hide Vouchers menue item', () => {
      cy.getCy("vouchers-mobile").should("not.exist")
    });

    context("pull down contains menu items", () => {
      beforeEach(() => {
        cy.getCy("my-venue-mobile").trigger("click");
      });
      it("is expected to display Setup Venue", () => {
        cy.getCy("venue-setup-mobile")
          .should("exist")
          .and("contain.text", "Setup your venue")
          .and("be.visible");
      });

      it("is expected to hide Venue Details", () => {
        cy.getCy("venue-details-mobile").should("not.exist");
      });
    });
  });

});
