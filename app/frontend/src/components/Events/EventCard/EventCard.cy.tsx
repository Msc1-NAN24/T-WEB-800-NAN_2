import EventCard from "./EventCard"
import { should } from 'chai';

describe('<EventCard />', () => {
    it('renders', () => {
        cy.mount(<EventCard />)

        //cy.get(img)

        cy.get('h3')
        cy.get('p')
        cy.get('p')
    })
})