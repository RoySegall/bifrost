describe('Events filtering', function() {

  it('Check events are filtered', () => {
    cy.login('tony', 'ilovepeper');
    cy.visit('/');
    cy.xpath('//a[.="Trip to New York"]').click();

    cy.xpath('//h3').should('have.length', 4);

    cy.get('.pickingCars').click();
    cy.contains('Flight to Frankfurt').should('not.be.visible');

    cy.xpath('//h3').should('have.length', 1);


    cy.get('.all').click();
    cy.contains('Flight to Frankfurt').should('be.visible');
    cy.xpath('//h3').should('have.length', 4);
  });
});
