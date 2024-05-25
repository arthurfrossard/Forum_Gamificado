/// <reference types="cypress" />

describe('Login Functionality', () => {
  it('should display login form and login a user', () => {
    cy.visit('/login');
    cy.get('input[id="email"]').type('teste.site@exemplo.com');
    cy.get('input[id="password"]').type('123456789');
    cy.get('form').submit();

    cy.url().should('include', '/');
    cy.contains('Home');
  });

  it('should show an error message with incorrect credentials', () => {
    cy.visit('/login');

    cy.get('input[id="email"]').type('wrong@example.com');
    cy.get('input[id="password"]').type('wrongpassword');
    cy.get('form').submit();

    cy.contains('Email não encontrado').should('be.visible');
  });
});
