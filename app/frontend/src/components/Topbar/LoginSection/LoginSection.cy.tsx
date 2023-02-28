import React from 'react'
import LoginSection from './LoginSection'

const mockedUser = {
  email: 'matheo.bellanger@gmail.com',
  picture: '',
  firstname: 'Mathéo',
  lastname: 'Bellanger',
  created_at: new Date(),
  updated_at: new Date(),
}

describe('Not logged <LoginAvatar />', () => {
  it('renders', () => {
    cy.mount(<LoginSection user={undefined}/>);

    cy.get('.login-buttons')
      .should('be.visible');
  });
})


describe('Logged <LoginAvatar />', () => {
  it('renders', () => {
    cy.mount(<LoginSection user={mockedUser}/>);

    cy.get('.user-avatar')
      .should('be.visible')
      .should('have.attr', 'title', 'Mathéo Bellanger')

    cy.get('.login-buttons')
      .should('not.be.visible');
  });
})