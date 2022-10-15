describe("Navigating the application on MOBILE device", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-x");
    cy.getCy("mobile-nav-toggle").trigger("click");
  });

  describe("Logo link", () => {
    before(() => {
      cy.viewport("iphone-x");
      cy.visit("/auth/sign-up");
      cy.getCy("mobile-logo").trigger("click");
    });

    it("is expected to navigate to root path", () => {
      cy.location("pathname").should("eq", "/");
    });
  });

  describe("FOOTER: Content visibility", () => {
    beforeEach(() => {
      cy.getCy("mobile-nav-toggle").trigger("click");
      cy.getCy("toggle-footer-content-section").trigger("click");
    });

    it("is expected to toggle visibility of footer sections", () => {
      cy.getCy("footer-content").should("exist").and("be.visible");
    });
  });

  describe("as a VISITOR", () => {
    context("Sign Up Process", () => {
      beforeEach(() => {
        cy.getCy("sign-up-button-mobile").trigger("click");
      });

      it("is expected to navigate to auth/sign-up", () => {
        cy.location("pathname").should("eq", "/auth/sign-up");
      });
    });

    context("Login Process", () => {
      beforeEach(() => {
        cy.getCy("sign-in-button-mobile").trigger("click");
      });

      it("is expected to navigate to auth/sign-up", () => {
        cy.location("pathname").should("eq", "/auth/sign-in");
      });
    });

    context("Voucher management", () => {
      it("is expected to HIDE voucher management links", () => {
        cy.getCy("voucher-management-mobile").should("not.exist");
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
      cy.getCy("my-venue-mobile").trigger("click");
    });

    context("navigating to Venue Details", () => {
      beforeEach(() => {
        cy.getCy("venue-details-mobile").trigger("click");
      });

      it("is expected to navigate to /dashboard", () => {
        cy.location("pathname").should("eq", "/dashboard");
      });
    });

    context("navigating to Venue Edit", () => {
      beforeEach(() => {
        cy.getCy("venue-setup-mobile").trigger("click");
      });
      it("is expected to navigate to /dashboard/venue/setup", () => {
        cy.location("pathname").should("eq", "/dashboard/venue/setup");
      });

      it("is expected to display the right header", () => {
        cy.get("body").should("contain.text", "Edit your venue");
      });
    });

    context("Voucher management", () => {
      it("is expected to HIDE voucher management links", () => {
        cy.getCy("voucher-management-mobile").should("exist");
      });
    });
  });

  describe("as an AUTHENTICATED user WITHOUT venue", () => {
    beforeEach(() => {
      cy.fixture("venueCreateSuccess").then((fixture) => {
        cy.authenticateUser({
          ...fixture.vendor.users[1],
          vendor: null,
        });
      });
      cy.getCy("my-venue-mobile").trigger("click");
    });

    context("navigating to Venue Setup", () => {
      beforeEach(() => {
        cy.getCy("venue-setup-mobile").trigger("click");
      });

      it("is expected to navigate to /dashboard/venue/setup", () => {
        cy.location("pathname").should("eq", "/dashboard/venue/setup");
      });

      it("is expected to display the right header", () => {
        cy.get("body").should("contain.text", "Set up your venue");
      });
    });

    context("Voucher management", () => {
      it("is expected to HIDE voucher management links", () => {
        cy.getCy("voucher-management-mobile").should("not.exist");
      });
    });
  });
});
