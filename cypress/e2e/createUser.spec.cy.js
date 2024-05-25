/// <reference types="cypress" />

describe('Create User Functionality', () => {
  it('should create a new user', () => {
    cy.visit('/create-user');

    cy.get('input[id="email"]').type('newuser@example.com');
    cy.get('input[id="password"]').type('newpassword123');
    cy.get('input[id="userName"]').type('newuser');
    cy.get('form').submit();

    cy.url().should('include', '/login');
    cy.contains('Login');
  });
});
