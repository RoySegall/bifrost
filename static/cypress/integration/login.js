describe('Logging in', function() {

  it('Testing the login', function() {
    cy.visit('http://localhost:3000');

    // Try to submit with empty creds.
    cy.get('.flex-row.text-center button').click();

    // Verify the error.
    cy.get('.alert-error').contains('Username is required');

    // Set up the username and submit the form. Verify we got and error.
    cy.get('#username').type('tossny');
    cy.get('.flex-row.text-center button').click();
    cy.get('.alert-error').contains('Password is required');

    // Set up the wrong password.
    cy.get('#password').type('tony');
    cy.get('.flex-row.text-center button').click();
    cy.get('.alert-error')
      .contains('Something went wrong: Some of the details are not correct');

    // Set the correct password.
    cy.get('#password').clear().type('ilovepeper');
    cy.get('.flex-row.text-center button').click();

    // Verify we got the correct message and page.
    cy.get('.alert-success');
    cy.get('.timeline').should('be.visible');

    cy.url().should('include', '/');

    // Verify we got the timelines.
    cy.get('.trip-title').contains('Trip to New York');
  })
});
