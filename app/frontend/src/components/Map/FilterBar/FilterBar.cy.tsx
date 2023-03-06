export {}

import React from 'react'
import FilterBar from './FilterBar'

describe('<FilterBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FilterBar/>);
    cy.get('.map-bar-date')
    cy.get('.map-bar-filter-list').should('be.visible');
    cy.get('.map-bar-filter-list-1').should('be.visible').should('contain.value', 'Hotels');
    cy.get('.map-bar-filter-list-more').should('be.visible');
    cy.get('.map-bar-starting-date').should('be.visible');
    cy.get('.map-bar-ending-date').should('be.visible');
    cy.get('.map-bar-filter-type').should('be.visible');
  });
});