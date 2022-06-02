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

    it('Browser and take orders', () => {
      cy.get('.accordion', {timeout: 8000}).click({multiple: true})    
    })

    it('Load Products tab', () => {
        cy.contains('Products').click()
        cy.get('.page-title', {timeout: 8000}).should('include.text', 'Products')
    })

    it('Load Deals tab and create a deal', () => {
        cy.contains('Deals').click()
        cy.get('.page-title-deals', {timeout: 10000}).should('include.text', 'Deals')

        cy.contains('Create a Deal').click()
        cy.contains('Deal\'s Name').next().type('Text Test Deal')
        cy.get('form').children().first().type('Some item')
        cy.get('form').children().eq(1).children().first().type('1200')
        cy.get('form').children().eq(1).children().last().type('2')

        cy.get('button[type=submit]').click()
        cy.contains('Submit').click({force: true})
    })

    it('Loads Reviews tab', () => {
        cy.contains('Reviews').click()
        cy.get('.page-title-reviews', {timeout: 8000}).should('include.text', 'Reviews')
    })

    it('Loads Account tab', () => {
      cy.contains('Account').click()
      cy.get('.page-title-account', {timeout: 8000}).should('include.text', 'Account')

      cy.contains('New Email').next().type('test123@cypress.dev')
      cy.contains('New Password').next().type('you were not supposed to see this')
      cy.contains('Confirm Password').next().type('you were not supposed to see this')

      cy.contains('Update').click()
  })
  })