import React from 'react'
import SearchBar from './SearchBar'

describe('<SearchBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

    const onSearchSpy = cy.spy().as('onSearchSpy');
    const onClickUpdateLocationSpy = cy.spy().as('onClickUpdateLocationSpy');

    cy.mount(<SearchBar onSearch={onSearchSpy} onClickUpdateLocation={onClickUpdateLocationSpy}/>);
    cy.get('.map-input').should('be.visible').type('Hello World');
    cy.get('.map-input-search').should('be.visible').click();
    cy.get('.map-input-location').should('be.visible').click();

    cy.get('@onSearchSpy').should('have.been.called');
    cy.get('@onClickUpdateLocationSpy').should('have.been.called');
  });
});