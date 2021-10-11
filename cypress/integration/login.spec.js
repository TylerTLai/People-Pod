describe("Logging in", () => {
  beforeEach(() => {
    cy.login().debugger();
  });

  // it("should login", () => {
  //   cy.request("/api/me").then(({ body: user }) => {
  //     expect(user.email).to.equal(Cypress.env("auth0Username"));
  //   });
  // });
});
