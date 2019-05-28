// Created a variables out of repeated strings
const tableBody = 'table[class="table table-hover table-sm"] tbody';
const btnSecondary = 'btn btn-secondary btn-secondary-lenses';
const btnDanger = 'btn btn-danger';

const typeInSearch = value => {
  // Using "wait" function because saving a new Policy is asynconous,
  // therefore getting an error when trying to search for the new policy before it is appended in DOM
  cy.wait(1000);
  cy.get('div[class="table-search"]')
    .find('input[type="text"]')
    .type(value);
};

const btn = classes => `button[class="${classes}"]`;

describe.only('Data Protection', () => {
  beforeEach(() => {
    cy.login();
    cy.get('.navbar', { timeout: 10000 }).should('exist');
  });

  context('Creation', () => {
    it('I can navigate to the Policies page, create a new Policy and then delete it', () => {
      cy.get('.navbar a[href="/dataprotection/policies"]')
        .should('contain', 'POLICIES')
        .click();
      cy.get('#dataProtectionContainer').should('exist');

      // If Loading Default Policies button exists then click it
      // This is needed because if clicked once it would automatically load the policies every time i ran the test
      // unless the docker image was stopped and rerun
      cy.get(btn(btnSecondary)).then($btn => {
        if ($btn.text().includes('Load Default Policies')) {
          $btn.click();
        }
      });

      // Ensuring the policies have been loaded
      cy.get(tableBody);

      // Clicking on New Policy button
      cy.get(btn(btnSecondary))
        .should('contain', 'New policy')
        .click();

      // Targeting Policy Name input field and typing the name
      cy.get('input[id="name"]').type('TestLenses');

      // Targeting Redaction select field and selecting redaction type
      cy.get('select[id="obfuscation"]').select('All');

      // Targeting Impact select field and selecting impact level
      cy.get('select[id="impactType"]').select('HIGH');

      // Targeting Category select field and selecting a taxonomy
      cy.get('div[id="category"]')
        .find('input')
        // Using {force: true} because element is hidden and cannot be accessed otherwise
        .type('PII', { force: true })
        // Pressing enter to actually select the value we typed
        .type('{enter}');

      // Targeting Fields input
      cy.get('div[class="react-tagsinput-input"]')
        .find('input[placeholder="Add a field"]')
        // Adding a field
        .type('Test Field')
        .type('{enter}')
        // Adding second field to make sure it works as intended
        .type('Testing multiple fields')
        .type('{enter}');

      // Submitting the form
      cy.get(
        'form[class="new-policy-form needs-validation container-fluid pt-2"]'
      ).submit();

      typeInSearch('TestLenses');

      cy.get(tableBody)
        .should('contain', 'TestLenses')
        .find('td:last-child a')
        .click();

      cy.get(btn(btnDanger))
        // As said above, this check might not be necessary since there is only one button
        .should('contain', 'Delete')
        .click();

      typeInSearch('TestLenses');

      // Check if any table row contains the string 'TestLenses'
      cy.get(tableBody).should('not.contain', 'TestLenses');
    });
  });
});
