describe('Events filtering', function() {

  it('Check events are filtered', () => {
    cy.login('tony', 'ilovepeper');
    cy.visit('/');
    cy.get('a').contains('Trip to New York').click();

    // todo: check for titles and check they will appear or not.
    cy.get('.pickingcarSet').click();
    cy.contains('Flight to Frankfurt').should('not.be.visible');


    cy.get('.all').click();
    cy.contains('Flight to Frankfurt').should('be.visible');
  });
});
