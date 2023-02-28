import React from 'react'
import Modal from './Modal'

describe('Basic <Modal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onDismissSpy = cy.spy().as('onDismissSpy')

    cy.mount(<Modal open onDismiss={onDismissSpy}><h1 className={"abc"}>Hello World</h1></Modal>);

    cy.get('.abc').should('be.visible').should('contain.text', 'Hello World');
    cy.get('body').click('top');

    cy.get('@onDismissSpy').should('have.been.called');
  })
})