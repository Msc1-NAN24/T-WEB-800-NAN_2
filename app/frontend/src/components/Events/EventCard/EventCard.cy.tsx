import EventCard from "./EventCard"
import { should } from 'chai';

describe('<Event />', () => {
    it('renders', () => {
        cy.mount(<EventCard />)

        //cy.get(img)

        cy.get('h3')
            .should('be.visible')
            .should('contain.text', 'Atelier maison: créer ses pâtisseries')
        cy.get('p')
            .should('be.visible')
            .should('contain.text', '21 janvier à 16h - Nantes, commerce')
        cy.get('p')
            .should('be.visible')
            .should('contain.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis eu magna ac lacinia. Quisque scelerisque neque sit amet dignissim sodales.')
    })
})