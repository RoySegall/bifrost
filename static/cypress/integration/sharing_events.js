describe('Sharing events', function() {

    it('Check events are filtered', () => {
        cy.login('peter', 'marryjane');
        cy.visit('/');
        cy.get('.text-3xl').should('contain', 'Trip to New York');

        // Testing the logic of the sharing events.
        cy.contains('Trip to New York').click();

        // Verify we should not have the flight events.
        cy.contains('Flight to Frankfurt').should('not.be.visible');

        // Logging as tony and verify the flight to frankfurt exists.
        cy.login('tony', 'ilovepeper');
        cy.visit('/');
        cy.get('.text-3xl').should('contain', 'Trip to New York');
        cy.contains('Trip to New York').click();
        cy.contains('Flight to Frankfurt').should('be.visible');
    });
});
