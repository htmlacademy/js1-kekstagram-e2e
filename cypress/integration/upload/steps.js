import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^подставляется превью изображения$/, () => {
  cy.get('.img-upload__preview img')
    .should('have.attr', 'src')
    .should('include', 'blob');
});

Then(/^подставляется превью изображения$/, () => {
  cy.get('.img-upload__preview img')
    .should('have.attr', 'src')
    .match(/blob:/);
});


Then(/^изображение подставляется в превью эффектов$/, () => {
  cy.get('.effects__preview')
    .each((preview) => {
      expect(preview).to.have.css('background-image').match(/blob:/);
    });
});
