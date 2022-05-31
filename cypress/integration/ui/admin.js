describe('UI - Admin', () => {
    it('Visits the admin panel', () => {
      cy.visit(Cypress.env('base_url') + '/admin')
    })

    it('Checks title and scroll bottom smoothly', () => {

        cy.title().should('include', 'Admin')
  
        cy.scrollTo('bottom', { easing: 'linear', duration: 2000 })
  
      })
  
    it('Should switch to dark mode', () => {

        cy.scrollTo('top')
        cy.contains('dark_mode').click()
    })

    it('Opens cart from right-side', () => {
        cy.contains('shopping_cart').click()
    })

    it('Clear cart if not and close', () => {
        cy.contains('Clear Cart').click()

        // check if cart clear was successfull
        cy.get('tbody')
        .children()
        .should('have.length', 0)
        cy.contains('shopping_cart').click()
    })

    it('Login to test mode', () => {
        cy.contains('Email Address').next().type(Cypress.env('admin_email'))
        cy.contains('Password').next().type(Cypress.env('admin_pass'))

        cy.contains('Sign In').click()
        cy.wait(3000);
        
    })
  })