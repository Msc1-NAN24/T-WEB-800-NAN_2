import React from 'react'
import Topbar from './Topbar'

describe('<Topbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Topbar />)

    cy.get('ul').get('li')
      .should('be.visible')
      .should('contain.text', 'Accueil')
      .click();

    cy.url()
      .should('contain', '/');

    cy.get('div').find('img').should('have.attr', 'src');

    cy.get('div').find('img').should('have.attr', 'title');
  })
})