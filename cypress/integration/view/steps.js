import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(/^миниатюра номер (\d+) содержит альтернативный текст '(.*)'$/, (nth, alt) => {
  cy.get('a.picture')
    .eq(nth)
    .find('.picture__img')
    .should('have.attr', 'alt', alt);
});

Then(/^миниатюра номер (\d+) содержит (\d+) лайков$/, (nth, count) => {
  cy.get('a.picture')
    .eq(nth)
    .find('.picture__likes')
    .should('have.text', count);
});

Then(/^миниатюра номер (\d+) содержит (\d+) комментариев$/, (nth, count) => {
  cy.get('a.picture')
    .eq(nth)
    .find('.picture__comments')
    .should('have.text', count);
});

let elementCount = 0;
Then(/^запоминаю количество элементов на странице$/, () => {
  cy.get('*')
    .its('length')
    .then((length) => {
      elementCount = length;
    });
});

Then(/^на странице появился новый элемент$/, () => {
  cy.get('*')
    .should('have.length.greaterThan', elementCount);
  elementCount = 0;
});

When(/^кликаю на миниатюру номер (\d+)$/, (nth) => {
  cy.get('a.picture')
    .eq(nth)
    .click();
});

Then(/^модальное окно содержит изображение '(.*)'$/, (imgUrl) => {
  cy.get('.big-picture__img img')
    .should('have.attr', 'src', imgUrl);
});

Then(/^модальное окно содержит описание изображения '(.*)'$/, (description) => {
  cy.get('.big-picture .social__caption')
    .should('have.text', description);
});

Then(/^модальное окно содержит (\d+) лайков$/, (count) => {
  cy.get('.big-picture .likes-count')
    .should('have.text', count);
});

Then(/^модальное окно содержит (\d+) комментариев$/, (count) => {
  cy.get('.big-picture .comments-count')
    .should('have.text', count);
});

Then(/^отрисовано (\d+) комментариев$/, (count) => {
  cy.get('.big-picture .social__comment')
    .filter(':visible')
    .should('have.length', count);
});

Then(/^на счётчике (\d+) из (\d+) комментариев$/, (current, total) => {
  cy.get('.big-picture .social__comment-count')
    .should('have.text', `${current} из ${total} комментариев`);
});

Then(/^комментарий номер (\d+) содержит аватар '(.*)'$/, (nth, imgUrl) => {
  cy.get('.social__comment')
    .eq(nth)
    .find('.social__picture')
    .should('have.attr', 'src', imgUrl);
});

Then(/^комментарий номер (\d+) содержит альтернативный текст '(.*)'$/, (nth, alt) => {
  cy.get('.social__comment')
    .eq(nth)
    .find('.social__picture')
    .should('have.attr', 'alt', alt);
});

Then(/^комментарий номер (\d+) содержит текст '(.*)'$/, (nth, text) => {
  cy.get('.social__comment')
    .eq(nth)
    .find('.social__text')
    .should('have.text', text);
});

When(/^прокручиваю модальное окно$/, () => {
  cy.get('.big-picture').scrollTo('bottom')
});
