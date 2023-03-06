export {}


import React from 'react'
import LoginSection from './LoginSection'
import {User} from "@/utils/type";

const mockedUser: User = {
  email: 'matheo.bellanger@gmail.com',
  picture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  firstname: 'Mathéo',
  lastname: 'Bellanger',
  created_at: new Date(),
  updated_at: new Date(),
  password: 'abc',
}

describe('Not logged <LoginAvatar />', () => {
  it('renders', () => {
    cy.mount(<LoginSection onClickButton={() => null} user={undefined}/>);

    cy.get('.login-buttons')
      .should('exist');
  });
})


describe('Logged <LoginAvatar />', () => {
  it('renders', () => {
    cy.mount(<LoginSection onClickButton={() => null} user={mockedUser}/>);

    cy.get('.user-avatar')
      .should('exist')
      .should('have.attr', 'title', 'Mathéo Bellanger')

    cy.get('.login-buttons')
      .should('not.exist');
  });
})