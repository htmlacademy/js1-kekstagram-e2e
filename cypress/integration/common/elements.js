import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^элемент '(.*)' видим$/, (selector) => {
  cy.get(selector).should('be.visible');
});
Then(/^элемент '(.*)' невидим$/, (selector) => {
  cy.get(selector).should('not.be.visible');
});

Then(/^элемент '(.*)' содержит класс '(.*)'$/, (selector, cssClass) => {
  cy.get(selector).should('have.class', cssClass);
});
Then(/^элемент '(.*)' не содержит класс '(.*)'$/, (selector, cssClass) => {
  cy.get(selector).should('not.have.class', cssClass);
});

Then(/^элемента '(.*)' нет на странице$/, (selector) => {
  cy.get(selector).should('not.exist');
});

Then(/^значение поля '(.*)' равно '(.*)'$/, (selector, value) => {
  cy.get(selector)
    .should('have.value', value);
});

Then(/^заполнено поле загрузки файла$/, () => {
  cy.get('.img-upload__input')
    .should('have.prop', 'value')
    .should('include', 'JavaScript-logo.png');
});

Then(/^на странице '(.*)' миниатюр$/, (count) => {
  cy.get('a.picture')
    .should('have.length', count);
});

Then(/^миниатюра номер (\d+) содержит изображение '(.*)'$/, (nth, imgUrl) => {
  cy.get('a.picture')
    .eq(nth)
    .find('.picture__img')
    .should('have.attr', 'src', imgUrl);
});
