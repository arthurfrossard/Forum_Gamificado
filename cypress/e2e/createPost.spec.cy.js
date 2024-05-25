describe('Create Post', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[id="email"]').type('teste.site@exemplo.com');
    cy.get('input[id="password"]').type('123456789');
    cy.get('button[type="submit"]').click();
  });

  it("should create a new post", () => {
    cy.get("#postar").click();
    cy.get("#title").type("New Post Title");
    cy.get("#description").type("New Post Description");
    cy.get("#keyWords").type("keyword1, keyword2, keyword3");
    cy.get("#criar-post-teste").click();
    cy.wait(100);
    cy.visit('/');
    cy.wait(100);
    cy.contains("New Post Title").should("exist");
  });
});
