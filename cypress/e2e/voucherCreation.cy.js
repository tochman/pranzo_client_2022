describe("Vouchers: create a batch", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "**/api/vendors/**/vouchers", {
      body: { message: "10 new vouchers was created" },
      statusCode: 201,
    }).as("batchCreate");
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
    cy.fixture("vouchersIndex").then((fixture) => {
      cy.applicationState().invoke("dispatch", {
        type: "user/setVouchers",
        payload: fixture.vouchers,
      });
    });
    cy.getCy("vouchers").click();
    cy.getCy("voucher-create").click();
    cy.get("body").click();
  });

  describe("UI", () => {
    it("is expected to route to '/dashboard/vouchers/create' ", () => {
      cy.location("pathname").should("eq", "/dashboard/vouchers/create");
    });

    it("is expected to have a form", () => {
      cy.getCy("batch-create-vouchers").should("exist").and("be.visible");
    });
  });

  describe("Submitting the form for CONSUMPTION CARDS", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/vendors/**/vouchers", {
        fixture: "vouchersIndexUpdatedAfterCreatingServings",
      });
      cy.getCy("amount").type(10);
      cy.getCy("variant").select("servings");
      cy.getCy("value").select("10");
      cy.getCy("submit-create-form").click();
    });

    it("is expected to make a POST request", () => {
      cy.wait("@batchCreate").its("request.method").should("eq", "POST");
    });

    it.only("is expected to include selection as request parameters", () => {
      cy.wait("@batchCreate").then(({ request }) => {
        debugger
        expect(request.body.command).to.eql("batch");
        expect(request.body.amount).to.eql("10");
        expect(request.body.voucher.value).to.eql("10");
        expect(request.body.voucher.variant).to.eql("servings");
      });
    });

    it("is expected to display the new vouchers as inactive", () => {
      cy.getCy("voucher-status").click();
      cy.get("[data-cy=vouchers-index]>tbody").within(() => {
        cy.get('td:contains("12345")').should("have.length", 10);
      });
    });
  });

  describe("Submitting the form for GIFT CARDS", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/vendors/**/vouchers", {
        fixture: "vouchersIndexUpdatedAfterCreatingCash",
      });
      cy.getCy("amount").type(10);
      cy.getCy("variant").select("cash");
      cy.getCy("value").select("250");
      cy.getCy("submit-create-form").click();
    });

    it("is expected to make a POST request", () => {
      cy.wait("@batchCreate").its("request.method").should("eq", "POST");
    });

    it("is expected to include selection as request parameters", () => {
      cy.wait("@batchCreate").then(({ request }) => {
        expect(request.body.command).to.eql("batch");
        expect(request.body.amount).to.eql("10");
        expect(request.body.voucher.value).to.eql("250");
        expect(request.body.voucher.variant).to.eql("cash");
      });
    });

    it("is expected to display the new vouchers as inactive", () => {
      cy.getCy("voucher-status").click();
      cy.get("[data-cy=vouchers-index]>tbody").within(() => {
        cy.get('td:contains("12345")').should("have.length", 10);
      });
    });
  });
});
