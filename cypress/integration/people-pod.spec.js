describe("PeoplePod landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the navbar", () => {
    cy.get("nav")
      .should("be.visible")
      .within(() => {
        cy.get('[data-cy="people-pod-link"]').should("have.text", "People Pod");
        cy.get('[data-cy="log-in-link"]').should("have.text", "Log in");
      });
  });

  // it("should display the dashboard button when user logs in", () => {
  //   cy.get("nav").within(() => {
  //     cy.get('[data-cy="log-in-link"]').click();
  //     cy.get('[data-cy="dashboard-link"]').should("exist");
  //   });
  // });
});

// describe("PeoplePod Dashboard", () => {
//   beforeEach(() => {
//     cy.visit("/dashboard");
//   });

//   it("should display the dashboard navbar", () => {
//     cy.get("nav").within(() => {
//       cy.get('[data-cy="people-pod-link"]').should("have.text", "People Pod");
//       cy.get('[data-cy="search-input"]').should("exist");
//       cy.get('[data-cy="user-profile-image"]').should("exist");
//     });
//   });
// });
