describe('Vue 3 App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Visite la page d'accueil", () => {
    cy.contains('h1', 'Home');
  });

  it('Visite la page de login', () => {
    cy.contains('Connexion').click();
    cy.contains('h2', 'Connexion');
  });

  it('Visite la page de register', () => {
    cy.contains('Inscription').click();
    cy.contains('h2', 'Inscription');
  });

  it("L'inscription fonctionne", () => {
    cy.contains('Inscription').click();
    cy.get('#name').type('test');
    cy.get('#email').type('test@test.fr');
    cy.get('#password').type('riuehuhrfezhop');
    cy.get('button').contains('Inscription').click();
    cy.contains('h2', 'Connexion');
  });

  it('La connexion fonctionne', () => {
    cy.contains('Connexion').click();
    cy.get('#email').type('test@test.fr');
    cy.get('#password').type('riuehuhrfezhop');
    cy.get('button').contains('Connexion').click();
    cy.contains('Mon profil');
    cy.contains('Déconnexion');
  });
});
