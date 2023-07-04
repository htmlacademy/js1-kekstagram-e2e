import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given('нахожусь на главной странице сайта', () => {
  cy.visit('/');
});

Given(/^выбираю изображение для загрузки$/, () => {
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

Given(/^загружаю данные$/, () => {
  cy.intercept(
    'GET',
    'https://*.javascript.pages.academy/kekstagram/data',
    {fixture: 'data.json'}
  ).as('getData');
});

Given(/^сервер не отвечает$/, () => {
  cy.intercept({
    method: 'GET',
    url: 'https://*.javascript.pages.academy/kekstagram/data',
  }, {
    statusCode: 500,
  })
    .as('getData');
});

When(/^запрос завершён$/, () => {
  cy.wait('@getData');
});
