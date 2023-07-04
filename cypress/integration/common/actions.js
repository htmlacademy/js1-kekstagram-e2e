import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^нахожусь на главной странице сайта$/, () => {
  cy.visit('/');
});

When(/^выбираю изображение для загрузки$/, () => {
  cy.get('.img-upload__input')
    .selectFile('cypress/fixtures/JavaScript-logo.png', {force: true});
});

When(/^кликаю по элементу '(.*)'$/, (selector) => {
  cy.get(selector)
    .scrollIntoView()
    .click({force: true});
});

When(/^нажимаю клавишу '(.*)'$/, (key) => {
  cy.get('body').type(`{${key}}`);
});

When(/^в поле '(.*)' ввожу текст '(.*)'$/, (selector, text) => {
  cy.get(selector).type(text);
});

When(/^очищаю поле '(.*)'$/, (selector) => {
  cy.get(selector).clear();
});

When(/^фокусирую поле '(.*)'$/, (selector) => {
  cy.get(selector).focus();
});

Then(/^подменяю таймеры$/, () => {
  cy.clock();
});

Then(/^тикаю на '(.*)' ms$/, (ms) => {
  cy.tick(Number(ms));
});
