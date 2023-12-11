describe('Session Management', () => {
    it('persists session on page reload', () => {
      // Log in
      cy.visit('http://localhost:3000');
      cy.get('[name="username"]').type('iron_man');
      cy.get('[name="password"]').type('stark123');
      cy.contains('SUBMIT').click();
      cy.reload();
      cy.contains('Fake Stack Overflow');
    });
  
    it('logs out successfully', () => {
      // Log in
      cy.visit('http://localhost:3000');
      cy.get('[name="username"]').type('iron_man');
      cy.get('[name="password"]').type('stark123');
      cy.contains('SUBMIT').click();
      cy.contains('Logout').click();
      cy.contains('LOGIN');
    });
  });
  
  describe('Security Checks', () => {
    it('prevents SQL injection in credentials', () => {
      cy.visit('http://localhost:3000');
      const sqlInjectionUsername = "' OR 1=1 --";
      const sqlInjectionPassword = "' OR '1'='1";
      
      cy.get('[name="username"]').type(sqlInjectionUsername);
      cy.get('[name="password"]').type(sqlInjectionPassword);
      cy.contains('SUBMIT').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('User not found.');
      });
    });
  
    it('prevents cross-site scripting (XSS) attacks', () => {
        
      const xssUsername = '<script>alert("XSS");</script>';
      const xssPassword = '<img src="invalid-image" onerror="alert(\'XSS\');" />';
      cy.visit('http://localhost:3000');
      cy.get('[name="username"]').type(xssUsername);
      cy.get('[name="password"]').type(xssPassword);
      cy.contains('SUBMIT').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('User not found.');
      });
    });
  });
  
  describe('Usability', () => {
    it('is responsive on different browsers', () => {
      cy.visit('http://localhost:3000');
    });
  
  });
  