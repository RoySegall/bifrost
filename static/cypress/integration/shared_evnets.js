describe('Events filtering', function() {

  it('Check events are filtered', () => {
    cy.login('peter', 'marryjane');
    cy.visit('/');
    cy.get('.text-3xl').should('contain', 'Trip to New York');

    cy.login('tony', 'ilovepeper');
    cy.visit('/');
    cy.get('.text-3xl').should('contain', 'Trip to New York');

    cy.login('rid', 'thefour');
    cy.visit('/');
    cy.get('.text-3xl').should('contain', 'Trip to UK');
  });
});
