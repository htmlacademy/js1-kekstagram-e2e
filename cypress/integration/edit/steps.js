import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(/^масштаб изображения равен '(.*)'$/, (zoom) => {
  cy.get('.img-upload__preview img')
    .should('have.attr', 'style')
    .should('include', `transform: scale(${zoom})`);
});

Then(/^на изображение накладывается фильтр '(.*)' со значением '(.*)'$/, (filter, value) => {
  cy.get('.img-upload__preview img')
    .should('have.css', 'filter', `${filter}(${value})`);
});

Then(/^на изображение не накладывается фильтр$/, () => {
  cy.get('.img-upload__preview img')
    .should('have.css', 'filter', 'none');
});

When(/^перемещаю ползунок на '(.*)' делений влево$/, (count) => {
  for (let i = 0; i < count; i++) {
    cy.get('.noUi-handle')
      .focus()
      .type('{leftArrow}');
  }
});
