export {}

import React from 'react'
import TextInput from './TextInput'

describe('<TextInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onTextChangeSpy = cy.spy().as('onTextChangeSpy');
    cy.mount(<TextInput onTextChange={onTextChangeSpy}/>);

    cy.get('input').type('abc').should('contain.value', 'abc');
    cy.get('@onTextChangeSpy').should('have.been.calledThrice');
  })

  it('should display label and an error', () => {
    cy.mount(<TextInput error errorText={"Invalid email !"} prefix={"test-email"} label={"Hello world"}/>);

    cy.get('.test-email-error').should('be.visible').should('contain.text', 'Invalid email !');
    cy.get('.test-email-label').should('be.visible').should('contain.text', 'Hello world');
  });
});