import Events from "./Events"

describe('<Events />', () => {
    it('renders', () => {
        cy.mount(<Events />)

        cy.get('h2')
            .should('be.visible')
    })
})