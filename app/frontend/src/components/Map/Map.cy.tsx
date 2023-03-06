export {}


import React from 'react'
import Map from './Map'

describe('<Map />', () => {

  before(() => {
    process.env.MAPBOX_TOKEN = 'pk.eyJ1IjoiZnJuaWtobyIsImEiOiJja3lvcjFobm4wMnhlMzFtdm1haHl6c240In0.g07ZDGxjv3pcPqa2wwsmiQ';
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Map/>);
  });
});