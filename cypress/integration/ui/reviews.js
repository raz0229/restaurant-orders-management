describe('UI - Reviews page', () => {
    it('Visits the Reviews page', () => {
      cy.visit(Cypress.env('base_url') + '/reviews')
    })

    it('Checks title and scroll bottom smoothly', () => {

        cy.title().should('include', 'Reviews')
  
        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 })
  
      })

    it('Should switch to dark mode', () => {

        cy.scrollTo('top')
        cy.contains('dark_mode').click()
        cy.scrollTo('bottom', { easing: 'linear', duration: 3000 })
    })

    it('Load more reviews and try sort', () => {

        /* Run get_data.js from API to test reviews thououghly*/
        cy.contains('Load more').click()
        cy.scrollTo('top')
        cy.get('select').select('oldest')
        cy.get('select').select('latest')
        cy.get('select').select('title')
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

    it('Write a review', () => {
        /* Run get_data.js from API to test reviews submission*/

        cy.contains('Write a Review').click()
        cy.contains('Your Name').next().type('John Doe')
        cy.contains('Your Email').next().type('johndoe@gmail.com')
        cy.contains('Comment').next().type('This review is a test sumbission. Please delete it')
        cy.contains('Submit').should('not.be.disabled').click()
    })

  })