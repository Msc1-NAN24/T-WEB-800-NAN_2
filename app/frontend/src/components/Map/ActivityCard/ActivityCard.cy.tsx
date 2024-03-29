import ActivityCard from "./ActivityCard";

export {}

import React from 'react'

describe('<ActivityCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onPlanSpy = cy.spy().as('onPlanSpy');
    const onCloseSpy = cy.spy().as('onCloseSpy');

    cy.mount(<ActivityCard loading={false} show={true} onClose={onCloseSpy} onPlan={onPlanSpy} activity={{note: 4.3, place_id: '', description: 'Lorem ipsum...', title: 'Havana', picture: ['/']}}/>);

    cy.get('.map-activity-title').should('be.visible').should('contain.text', 'Havana');
    cy.get('.map-activity-description').should('be.visible').should('contain.text', 'Pas d\'informations');
    cy.get('.map-activity-note').should('be.visible').should('contain.text', '4.3');
    cy.get('.map-activity-img').should('be.visible');

    cy.get('.map-activity-close').should('be.visible').click();
    cy.get('.map-activity-plan').should('be.visible').click();

    //cy.get('@onPlanSpy').should('have.been.called');
    cy.get('@onCloseSpy').should('have.been.called');
  });
});
