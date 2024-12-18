import Login from './Login'

describe('Login Form', () => {
    beforeEach(() => {
    cy.mount(<Login />)
    })
  
    it('should display the login form', () => {
      cy.get('[data-cy=login-form]').should('be.visible')
      cy.get('[data-cy=email-input]').should('be.visible')
      cy.get('[data-cy=password-input]').should('be.visible')
      cy.get('[data-cy=submit-button]').should('be.visible')
      cy.wait(7000)
    })
  
    it('should show an error with invalid credentials', () => {
      cy.get('[data-cy=email-input]').type('wrong@example.com', { delay: 100 })
      cy.get('[data-cy=password-input]').type('wrongpassword', { delay: 100 })
      cy.get('[data-cy=submit-button]').click()
  
      cy.get('[data-cy=error-message]').should('be.visible')
      cy.get('[data-cy=error-message]').should('contain', 'Invalid email or password')
      cy.wait(7000)
    })
  
    it('should login successfully with correct credentials', () => {
      cy.get('[data-cy=email-input]').type('user@example.com', { delay: 100 })
      cy.get('[data-cy=password-input]').type('password123', { delay: 100 })
      cy.get('[data-cy=toggle-password-button]').click()
      cy.get('[data-cy=submit-button]').click()
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Login successful!')
      })
    })
  })