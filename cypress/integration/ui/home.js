describe('UI - Home page', () => {
    it('Visits the home page', () => {
      cy.visit(Cypress.env('base_url'))
    })

    it('Checks title and scroll bottom smoothly', () => {

        cy.title().should('include', 'Home')
  
        cy.scrollTo('bottom', { easing: 'linear', duration: 5000 })
  
      })

    it('Canvas renders the images in deals', () => {

        cy.get('.zoom').first().scrollIntoView()

        cy.get('.zoom')
        .children()
        .should(($div) => {
  
          const src = $div[0].getAttribute('src')
          expect(src).to.have.length.greaterThan(0)
        })   
  
      })
  
    it('Should switch to dark mode', () => {

        cy.scrollTo('top')
        cy.contains('dark_mode').click()
        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 })
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