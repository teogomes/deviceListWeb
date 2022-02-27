describe('Device App', () => {
  beforeEach(() => {
    // cy.request('POST', 'http://localhost:3001/reset');
    cy.visit('http://localhost:3000');
  });

  it('login page can be opened', () => {
    cy.contains('Login');
    cy.contains('Sign up');
  });

  it('login form can be opened', () => {
    cy.contains('Login').click();
  });

  it('sign up form can be opened', () => {
    cy.contains('Sign up').click();
  });

  it('user can login', () => {
    cy.contains('Login').click();
    cy.get('#username').type('root');
    cy.get('#password').type('1234');
    cy.get('#login-button').click();

    cy.contains('Logout');
  });

  it('login fails with wrong pass', () => {
    cy.contains('Login').click();
    cy.get('#username').type('root');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: '1234' });
    });

    it('user can add device', () => {
      cy.get('#fab-button').click();
      cy.get('input[name="model"]').type('cypress');
      cy.get('input[name="owner"]').type('cypress');
      cy.get('input[name="os"]').type('cypress');
      cy.get('input[name="notes"]').type('cypress');

      cy.get('#add-button').click();

      cy.contains('cypress');
    });

    it('add device from command', () => {
      cy.createDevice({
        owner: 'command',
        model: 'commang',
        os: 'commang',
        notes: 'command',
      });
    });
  });
});
