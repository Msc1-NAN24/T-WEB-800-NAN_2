import { should } from "chai"
import LoginModal from "./LoginModal"

describe('<LoginModal />', () => {
    it('renders', () => {
        cy.mount(<LoginModal />)

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
            .should('contain.text', 'Se connecter')
            .click();
        cy.get('a')
            .should('be.visible')
            .should('contain.text', 'Vous n\'avez pas de compte ? inscrivez-vous ici')
    })
})