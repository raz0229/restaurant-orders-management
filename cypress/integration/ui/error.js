describe('UI - Not Found (404)', () => {
    it('Visits page and verifies title', () => {
      cy.visit(Cypress.env('base_url') + '/foo', {failOnStatusCode: false})
      cy.title().should('include', 'Oops!')

    })

    it('Should switch to dark mode', () => {

        cy.scrollTo('bottom', {duration: 3000})
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
  })