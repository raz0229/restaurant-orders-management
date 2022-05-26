describe('UI - Deals', () => {
    it('Visits the menu page', () => {
      cy.visit(Cypress.env('base_url') + '/deals')
    })

    it('Checks title', () => {

        cy.title().should('include', 'Deals')
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
  
    it('Switch dark and test available sizes', () => {

        cy.contains('dark_mode').click()
        cy.get('.floater').click()
        // cy.get('.sizes').each( ($size) => {
        //   cy.wrap($size).scrollIntoView().click({force: true})

        //   cy.wrap($size).parent().parent().children().then( $div => {
        //     cy.wrap($div).should('not.include.text', 'undefined')
        //   })
        // })
        
    })

    it('Add first deal to cart and opens cart', () => {
      cy.contains('add_shopping_cart').click()
    })

    it('Price calculator works fine', () => {
        for (let i = 1; i <= 9; i++) cy.contains('add').click()
        for (let i = 1; i <= 9; i++) cy.contains('remove').click()

        cy.get('.delivery-val').should('not.include.text', 'undefined')
        .and($p => {
          expect($p).to.not.include.text('NaN')
        });

        cy.get('.total-val').should('not.include.text', 'undefined')
        .and($p => {
          expect($p).to.not.include.text('NaN')
        });
        
    })

    // it('Opens cart from right-side', () => {
    //     cy.contains('shopping_cart').click()
    // })

    // it('Clear cart if not and close', () => {
    //     cy.contains('Clear Cart').click()

    //     // check if cart clear was successfull
    //     cy.get('tbody')
    //     .children()
    //     .should('have.length', 0)
    //     cy.contains('shopping_cart').click()
    // })
  })