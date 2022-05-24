context('Get Requests', () => {
  
    // Manage HTTP requests in your app
  
    it('Verify Sanity response for fetching all groups populated with products', () => {
      // https://on.cypress.io/request
      cy.request(Cypress.env('base_url') + '/api')
        .should((response) => {
          expect(response.status).to.eq(200)
        })
        .its('body')
        .should('have.property', 'groups')
        .its('0')
        .should('have.property', 'products')
    })
  

    it('Verify Firestore response for fetching deals array', () => {
        // https://on.cypress.io/request
        cy.request(Cypress.env('base_url') + '/api/deals')
          .should((response) => {
            expect(response.status).to.eq(200)
          })
          .its('body')
          .should('have.property', 'dealArray')
          .its('0')
          .should('have.property', 'content')
      })


    it('Get all reviews from Firebase Firestore sorted \'default\'', () => {
        // https://on.cypress.io/request
        cy.request(Cypress.env('base_url') + '/api/reviews')
          .should((response) => {
            expect(response.status).to.eq(200)
          })
          .its('body')
          .should('have.property', 'reviews')
          .and('have.length.above', 0)
      })

      it('Get all reviews ... sorted \'latest\'', () => {
        // https://on.cypress.io/request
        cy.request({
            url: Cypress.env('base_url') + '/api/reviews',
            qs: {
                order: 'latest'
            }
        })
          .should((response) => {
            expect(response.status).to.eq(200)
          })
          .its('body')
          .should('have.property', 'reviews')
          .and('have.length.above', 0)
      })

      it('Get all reviews ... sorted \'oldest\'', () => {
        // https://on.cypress.io/request
        cy.request({
            url: Cypress.env('base_url') + '/api/reviews',
            qs: {
                order: 'oldest'
            }
        })
          .should((response) => {
            expect(response.status).to.eq(200)
          })
          .its('body')
          .should('have.property', 'reviews')
          .and('have.length.above', 0)
      })

      it('Cannt retrieve orders for unauthorized user', () => {
        // https://on.cypress.io/request
        cy.request({
            url: Cypress.env('base_url') + '/api/orders',
            failOnStatusCode: false,
        })
          .should((response) => {
            expect(response.status).to.not.eq(200)
          })
      })

  })
  