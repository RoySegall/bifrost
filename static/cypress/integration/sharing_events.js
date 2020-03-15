describe('Sharing events', function() {

    it('Check events are filtered', () => {
        cy.login('peter', 'marryjane');
        cy.visit('/');
        cy.get('.text-3xl').should('contain', 'Trip to New York');

        // Testing the logic of the sharing events.
    });
});
