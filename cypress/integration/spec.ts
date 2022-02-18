const searchTerm = 'star wars';
const movieId = 'tt0076759';

describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('gets search results and displays them in the movies grid', () => {
    cy.get('#search').click().type(searchTerm);

    cy.get('.mat-raised-button:nth-child(1)').click();

    cy.get('.ng-submitted').submit();

    cy.get('.movies-grid')
      .should('be.visible')
      .find('.movie')
      .should('have.length', 10);

    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}movies?search=${encodeURI(searchTerm)}`
    );
  });
});

describe('movie detail', () => {
  beforeEach(() => {
    cy.visit(`/movies?search=${encodeURI(searchTerm)}`);
  });

  it('gets movie detail and display its info', () => {
    cy.get('.movie:first-of-type')
      .trigger('mouseenter')
      .find('mat-icon:nth-child(2)')
      .click();

    cy.get('.poster').should('be.visible');
    cy.get('.mat-headline').should('be.visible');
    cy.get('.mat-headline').should(
      'have.text',
      'Star Wars: Episode IV - A New Hope'
    );
    cy.get('.mat-title').should('have.text', '1977');

    cy.url().should('eq', `${Cypress.config().baseUrl}movies/${movieId}`);
  });
});

describe('favourites', () => {
  beforeEach(() => {
    cy.visit(`/movies?search=${encodeURI(searchTerm)}`);
  });

  it('set movie as a favourite and display it in the movie grid in favourites route', () => {
    cy.get('.movie:first-of-type')
      .trigger('mouseenter')
      .find('mat-icon:nth-child(1)')
      .click();

    cy.get('.menu-button').click();
    cy.get('mat-nav-list > a:nth-child(2)').click();

    cy.wait(500);

    cy.get('.movies-grid')
      .should('be.visible')
      .find('.movie:first-of-type')
      .should('be.visible');
  });
});
