describe('Posts List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display posts list', () => {
    cy.get('.posts-test').should('be.visible');
    cy.get('.posts-test').children().should('have.length.greaterThan', 0);
  });
});

