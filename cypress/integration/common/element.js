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

Then(/^кнопка '(.*)' заблокирована$/, (selector) => {
  cy.get(selector).should('have.attr', 'disabled');
});

Then(/^кнопка '(.*)' разблокирована$/, (selector) => {
  cy.get(selector).should('not.have.attr', 'disabled');
});

When(/^кликаю по подложке '(.*)'$/, (selector) => {
  cy.get(selector).click('topLeft');
});
