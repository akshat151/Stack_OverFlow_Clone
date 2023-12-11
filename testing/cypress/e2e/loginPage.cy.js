describe('Deleting the database', () => {
    it('Deleting the database', () => {
        cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/destroy.js', { failOnNonZeroExit: false })
            .its('code')
            .should('eq', 0);
    });
});

describe('Fake SO Test Suite for Login Page', () => {
    beforeEach(() => {
        cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/init.js mongodb://127.0.0.1:27017/fake_so', { failOnNonZeroExit: false })
                .its('code')
                .should('eq', 0);
        cy.visit('http://localhost:3000');
      });

      afterEach(() => {
        cy.exec('node /Users/akshatkhare/Documents/Foundations\\ of\\ Software\\ Engineering/Final\\ Project/cs5500-final-project-akshat-amisha/server/destroy.js', { failOnNonZeroExit: false })
                .its('code')
                .should('eq', 0);
      });
      it('successfully loads login page', () => {
        cy.contains('LOGIN');
    });

    it('switches to signup form when "Signup" is clicked', () => {
        cy.contains('Signup').click();
        cy.contains('SIGN-UP');
    });

    it('logs in with valid credentials', () => {
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
    });

    it('displays error for invalid login credentials', () => {
        cy.get('[name="username"]').type('invalid-username');
        cy.get('[name="password"]').type('invalid-password');
        cy.contains('SUBMIT').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('User not found.');
        });
    });

    it('Username Empty Fields Validation', () => {
        cy.get('[name="password"]').type('invalid-password');
        cy.contains('SUBMIT').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Username cannot be empty');
        });
    });

    it('Passowrd Empty Fields Validation', () => {
        cy.get('[name="username"]').type('invalid-username');
        cy.contains('SUBMIT').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Password cannot be empty');
        });
    });

    it('Special Characters in Credentials', () => {
        cy.get('[name="username"]').type('user@name');
        cy.get('[name="password"]').type('special!password');
        cy.contains('SUBMIT').click();
    });

    it('Logs in as Guest User', () => {
        cy.contains('GUEST').click();
        cy.contains('Fake Stack Overflow');
    });

    it('Toggles between Login and Signup forms', () => {
        cy.contains('Signup').click();
        cy.contains('SIGN-UP');
        cy.contains('login').click();
        cy.contains('LOGIN');
    });

    it('logs out successfully', () => {
        cy.get('[name="username"]').type("iron_man");
        cy.get('[name="password"]').type("stark123");
        cy.contains('SUBMIT').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('Logout').click();
        cy.contains('LOGIN');
    });
});
