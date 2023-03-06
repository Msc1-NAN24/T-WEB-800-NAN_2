import RegisterModal from "./RegisterModal";
import { should } from 'chai';

describe('<RegisterModal />', () => {
    it('renders', () => {
        cy.mount(<RegisterModal />)

        cy.get('label')
            .should('be.visible')
            .should('contain.text', 'Nom');

        cy.get('#nom')
            .click();
        
        cy.get('label')
            .should('be.visible')
            .should('contain.text', 'Prénom');
        
        cy.get('#prénom')
            .click();

        cy.get('label')
            .should('be.visible')
            .should('contain.text', 'Email');
        
        cy.get('input[type=email]')
            .click();
        
        cy.get('label')
        .should('be.visible')
        .should('contain.text', 'Mot de passe');

        cy.get('input[type=password]')
            .click();
        
        cy.get('button')
            .should('contain.text', 'S\'inscrire')
            .click();
        cy.get('a')
            .should('be.visible')
            .should('contain.text', 'Vous avez déjà un compte? connectez-vous ici')

    })
})