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

Then(/^фильтр '(.*)' активен$/, (filterName) => {
  cy.get('.img-filters__form')
    .contains(filterName)
    .should('have.class', 'img-filters__button--active');
});

Then(/^выбран эффект «Оригинал»$/, () => {
  cy.get('#effect-none').should('be.checked');
});

Then(/^подставляется превью изображения$/, () => {
  cy.get('.img-upload__preview img')
    .should('have.attr', 'src')
    .should('include', 'blob:');
});

Then(/^изображение подставляется в превью эффектов$/, () => {
  cy.get('.effects__preview')
    .each((preview) => {
      expect(preview).to.have.css('background-image').match(/blob:/);
    });
});

const errorSet = new Set();
Then(/^запоминаю ошибку$/, () => {
  cy.get('.pristine-error')
    .each(($errorElement) => {
      errorSet.add($errorElement.text());
    });
});

Then(/^ошибки различаются$/, () => {
  expect(errorSet.size <= 4).to.be.equal(true);
  errorSet.clear();
});

Then(/^заполнено поле загрузки файла$/, () => {
  cy.get('.img-upload__input')
    .should('have.prop', 'value')
    .should('include', 'JavaScript-logo.png');
});

When(/^перемещаю ползунок на '(.*)' делений влево$/, (count) => {
  for (let i = 0; i < count; i++) {
    cy.get('.noUi-handle')
      .focus()
      .type('{leftArrow}');
  }
});
