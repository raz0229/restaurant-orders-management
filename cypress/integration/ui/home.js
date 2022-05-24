describe('UI - Home page', () => {
    it('Visits the home page', () => {
      cy.visit(Cypress.env('base_url'))
    
      //cy.contains('type').click()

      cy.title().should('include', 'Home')

    //   cy.get('.action-email')
    //   .type('fake@email.com')
    //   .should('have.value', 'fake@email.com')
     

    })
  })