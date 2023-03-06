import React from 'react'
import RegisterModal from './RegisterModal'

const mockedRegister = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  },
  accessToken: 'jesuisencoreletoken',
}

const mockedAlreadyExists = {
  error: 'Email already used !',
  code: 'REGISTER_EMAIL_ALREADY_REGISTERED'
}

const mockedBadRequest = {
  error: 'An error occurred !',
  code: 'REGISTER_ERROR',
}

describe('<RegisterModal /> - Click on "s\'inscrire"', function () {

  before(() => {
    process.env.API_URL = 'https://localhost:4000';
  })

  it('Should be logged !', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<RegisterModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo@gmail.com');
    cy.get('.modal-firstname-input').type('Pedro');
    cy.get('.modal-lastname-input').type('Sanchez');
    cy.get('.modal-password-input').type('helloworld');

    cy.intercept('POST', '/auth/register', {statusCode: 200, body: mockedRegister});
    cy.get('.modal-register-btn').click();
    cy.get('@onSuccessSpy').should('have.been.called');
  });

  it('Wrong email format', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<RegisterModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo');
    cy.get('.modal-firstname-input').type('perdo');
    cy.get('.modal-lastname-input').type('perdo');
    cy.get('.modal-password-input').type('helloworld');

    cy.get('.modal-register-btn').click();

    cy.get('.modal-email-error').should('be.visible');
    cy.get('.modal-password-error').should('not.exist');
    cy.get('.modal-firstname-error').should('not.exist');
    cy.get('.modal-lastname-error').should('not.exist');
    cy.get('@onSuccessSpy').should('not.have.been.called');
  });

  it('<RegisterModal /> Invalid password format !', () => {
    const onSuccessSpy = cy.spy().as('onSuccessSpy');
    cy.mount(<RegisterModal open onDismiss={() => {}} onSuccess={onSuccessSpy}/>);

    cy.get('.modal-email-input').type('perdo@gmail.com');
    cy.get('.modal-password-input').type('helloworld');

    cy.intercept('POST', '/auth/register', {statusCode: 400, body: mockedBadRequest});

    cy.get('.modal-register-btn').click();

    cy.get('.modal-email-error').should('not.exist');
    cy.get('.modal-password-error').should('not.exist');
    cy.get('@onSuccessSpy').should('not.have.been.called');
  });

});

describe('<RegisterModal /> - Switch to register', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onDismissSpy = cy.spy().as('onDismissSpy');
    const onSwitchToLoginSpy = cy.spy().as('onSwitchToLoginSpy');

    cy.mount(<RegisterModal open onDismiss={onDismissSpy} onSuccess={() => {}} switchToLogin={onSwitchToLoginSpy}/>);

    cy.get('.modal-title').should('be.visible').should('contain.text', 'S\'inscrire');

    cy.get('.modal-register-btn').should('be.visible').should('contain.text', 'S\'inscrire');
    cy.get('.modal-login-hint').should('be.visible').click();

    cy.get('@onSwitchToLoginSpy').should('have.been.called');
    cy.get('@onDismissSpy').should('not.have.been.called');
  })
});

describe('Custom title <RegisterModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const onDismissSpy = cy.spy().as('onDismissSpy')

    cy.mount(<RegisterModal open onDismiss={onDismissSpy} onSuccess={() => {}} title={"Hello World"}/>);

    cy.get('.modal-title').should('be.visible').should('contain.text', 'Hello World');
    cy.get('body').click('top');

    cy.get('@onDismissSpy').should('have.been.called');
  })
})