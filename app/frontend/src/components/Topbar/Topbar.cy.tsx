import React from 'react'
import Topbar from './Topbar'
import {User} from "@/utils/type";
import {AuthState, UserContext} from "@/contexts/UserContext";
import MockRouter from "../../../cypress/utility/router";

const mockedUser: User = {
  email: 'matheo.bellanger@gmail.com',
  picture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  firstname: 'Mathéo',
  lastname: 'Bellanger',
  created_at: new Date(),
  updated_at: new Date(),
  password: 'abc',
}

/*describe('<Topbar /> not logged', () => {

  beforeEach(() => {
    const pathname = '/profile'
    const push = cy.stub()
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
  })

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Topbar/>)

    cy.get('ul').get('li')
      .should('be.visible')
      .should('contain.text', 'Accueil')
      .click();

    cy.url()
      .should('contain', '/');

    cy.get('.logo').should('exist');
  })
})*/

describe('<Topbar /> logged', () => {

  it('renders', () => {
    cy.mount(
      <MockRouter asPath="/profile">
        <UserContext.Provider value={{user: mockedUser, onRegister: () => null, onLogin: () => null, state: AuthState.Logged, onLogout: () => null}}>
          <Topbar/>
        </UserContext.Provider>
      </MockRouter>)

    cy.get('ul').get('li')
      .first()
      .should('be.visible')
      .should('contain.text', 'Accueil')
      .click();

    cy.url()
      .should('contain', '/');

    cy.get('.logo').should('exist');
  })
})