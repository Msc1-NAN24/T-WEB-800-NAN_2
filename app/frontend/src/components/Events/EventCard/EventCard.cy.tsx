import EventCard from "./EventCard"
//import cy from 'cypress'

describe('<EventCard />', () => {
    it('renders', () => {
        cy.mount(<EventCard title={""} date={""} lieu={""} description={""} />)

        //cy.get(img)

        cy.get('h3')
        cy.get('p')
        cy.get('p')
    })
})