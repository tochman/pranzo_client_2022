describe("Reorting: generate and view", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "**/api/vendors/**/reports", {
      fixture: "reportResponse.json",
      statusCode: 201,
    }).as("reportCreate");
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
    cy.getCy("my-venue").click();
    cy.getCy("reports").click();
    cy.get("body").click();
  });

  describe("UI", () => {
    it("is expected to route to '/dashboard/vouchers/create' ", () => {
      cy.location("pathname").should("eq", "/dashboard/reports/create");
    });

    it("is expected to have a form", () => {
      cy.getCy("create-report").should("exist").and("be.visible");
    });
  });

  describe("Submitting the form for CONSUMPTION CARDS", () => {
    beforeEach(() => {
      cy.getCy("variant").select("today");
      cy.getCy("submit-form").click();
    });

    it("is expected to make a POST request", () => {
      cy.wait("@reportCreate").its("request.method").should("eq", "POST");
    });

    it("is expected to include selection as request parameters", () => {
      cy.wait("@reportCreate").then(({ request }) => {
        expect(request.body.period).to.eql("today");
      });
    });

    it("is expected to include message and report_as_base64 in response", () => {
      cy.wait("@reportCreate").then(({ response }) => {
        expect(response.body).to.have.ownProperty('message');
        expect(response.body).to.have.ownProperty('report_as_base64');
      });
    });


  });

});
