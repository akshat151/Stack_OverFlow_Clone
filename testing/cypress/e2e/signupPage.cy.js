describe('Signup Form', () => {
  beforeEach(() => {
    cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/init.js mongodb://127.0.0.1:27017/fake_so', { failOnNonZeroExit: false })
      .its('code')
      .should('eq', 0);
    cy.visit('http://localhost:3000');
    cy.contains('Signup').click();
  });

  afterEach(() => {
    cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/destroy.js', { failOnNonZeroExit: false })
      .its('code')
      .should('eq', 0);
  });

  it('successfully loads signup page', () => {
    cy.contains('SIGN-UP');
  });

  it('Empty Email Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').clear(); 
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Email cannot be empty');
    });
  });

  it('Invalid Email Format Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('invalidemail'); 
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Invalid email format');
    });
  });

  it('Empty Username Validation', () => {
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Username cannot be empty');
    });
  });

  it('Empty Password Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Password cannot be empty');
    });
  });

  it('Empty Password Again Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Password Again cannot be empty');
    });
  });

  it('Password Contains Username or Email Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('testuser123'); 
    cy.get('[name="passwordAgain"]').type('testuser123');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Password should not contain the username or email');
    });
  });

  it('Passwords Do Not Match Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('789012'); 
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Passwords do not match');
    });
  });

  it('Password Contains Existing Username or Email Validation', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.contains('Fake Stack Overflow');
    cy.contains('Logout').click();
    cy.contains('Signup').click();
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Username or Email already in use Please try again with a different Username and Email.');
    });
  });

  it('Successfull signup', () => {
    cy.get('[name="username"]').type('testuser123');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="passwordAgain"]').type('123456');
    cy.get('[name="email"]').type('testuser@example.com');
    cy.contains('SUBMIT').click();
    cy.contains('Fake Stack Overflow');
    cy.contains('Logout').click();
    cy.contains('Signup').click();
  });

});
