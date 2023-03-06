export {}

import React from 'react'
import LoginModal from './LoginModal'

const mockedLogin = {
  user: {},
  accessToken: 'jesuisletoken',
}

const mockedBadPassword = {
  error: 'Invalid password !',
  code: 'LOGIN_INVALID_PASSWORD'
}

describe('<LoginModal /> - Click on "se connecter"', function () {

  before(() => {
    process.env.API_URL = 'https://localhost:4000';
  })

  it('Should be logged !', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<LoginModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo@gmail.com');
    cy.get('.modal-password-input').type('helloworld');

    cy.intercept('POST', '/auth/login', {statusCode: 200, body: mockedLogin});
    cy.get('.modal-login-btn').click();
    cy.get('@onSuccessSpy').should('have.been.called');
  });

  it('Wrong email format', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<LoginModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo');
    cy.get('.modal-password-input').type('helloworld');

    cy.get('.modal-login-btn').click();

    cy.get('.modal-email-error').should('be.visible');
    cy.get('.modal-password-error').should('not.exist');
    cy.get('@onSuccessSpy').should('not.have.been.called');
  });

  it('Wrong password !', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<LoginModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo@gmail.com');
    cy.get('.modal-password-input').type('helloworld');

    cy.intercept('POST', '/auth/login', {statusCode: 400, body: mockedBadPassword});

    cy.get('.modal-login-btn').click();

    cy.get('.modal-email-error').should('not.exist');
    cy.get('.modal-password-error').should('not.exist');
    cy.get('@onSuccessSpy').should('not.have.been.called');
  });

});

describe('<LoginModal /> - Switch to register', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onDismissSpy = cy.spy().as('onDismissSpy');
    const onSwitchToRegisterSpy = cy.spy().as('onSwitchToRegisterSpy');

    cy.mount(<LoginModal open onDismiss={onDismissSpy} onSuccess={() => {}} switchToRegister={onSwitchToRegisterSpy}/>);

    cy.get('.modal-title').should('be.visible').should('contain.text', 'Se connecter');

    cy.get('.modal-login-btn').should('be.visible').should('contain.text', 'Se connecter');
    cy.get('.modal-register-hint').should('be.visible').click();

    cy.get('@onSwitchToRegisterSpy').should('have.been.called');
    cy.get('@onDismissSpy').should('not.have.been.called');
  })
});

describe('Custom title <LoginModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onDismissSpy = cy.spy().as('onDismissSpy')

    cy.mount(<LoginModal open onDismiss={onDismissSpy} onSuccess={() => {}} title={"Hello World"}/>);

    cy.get('.modal-title').should('be.visible').should('contain.text', 'Hello World');
    cy.get('body').click('top');

    cy.get('@onDismissSpy').should('have.been.called');
  })
})