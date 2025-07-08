/// <reference types="cypress" />
describe('Home page spec', () => {
    it.skip('deployed react app to localhost', () => {
        cy.visit('http://localhost:3000');
        cy.contains('1 user(s) already registered');
    });
});

describe('Formulaire d\'inscription', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('affiche tous les champs et le bouton', () => {
        cy.get('input[name="lastName"]').should('exist');
        cy.get('input[name="firstName"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="birthDate"]').should('exist');
        cy.get('input[name="city"]').should('exist');
        cy.get('input[name="postalCode"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('affiche un message d\'erreur si on soumet vide', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Merci de remplir tous les champs.').should('be.visible');
    });

    it('enregistre un utilisateur avec des données valides', () => {
        cy.get('input[name="lastName"]').type('Dupont');
        cy.get('input[name="firstName"]').type('Jean');
        cy.get('input[name="email"]').type('jean.dupont@example.com');
        cy.get('input[name="birthDate"]').type('1990-01-01');
        cy.get('input[name="city"]').type('Paris');
        cy.get('input[name="postalCode"]').type('75000');
        cy.get('button[type="submit"]').click();
        cy.contains('Utilisateur enregistré avec succès !').should('be.visible');
    });
});