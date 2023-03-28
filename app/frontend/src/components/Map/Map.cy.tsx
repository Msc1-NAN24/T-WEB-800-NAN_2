import MapLayout from "@/components/Map/MapLayout";

export {}

import React from 'react'

describe('<Map />', () => {

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MapLayout activities={[]} onPlanActivities={() => null}/>);
  });
});