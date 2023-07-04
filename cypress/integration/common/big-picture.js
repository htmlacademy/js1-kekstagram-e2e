Then(/^модальное окно содержит изображение '(.*)'$/, (imgUrl) => {
  cy.get('.big-picture__img img')
    .should('have.attr', 'src', imgUrl);
});

Then(/^модальное окно содержит описание изображения '(.*)'$/, (description) => {
  cy.get('.big-picture .social__caption')
    .should('have.text', description);
});

Then(/^модальное окно содержит '(.*)' лайков$/, (count) => {
  cy.get('.big-picture .likes-count')
    .should('have.text', count);
});

Then(/^модальное окно содержит '(.*)' комментариев$/, (count) => {
  cy.get('.big-picture .social__comment-total-count')
    .should('have.text', count);
});

Then(/^отрисовано '(.*)' комментариев$/, (count) => {
  cy.get('.big-picture .social__comment')
    .filter(':visible')
    .should('have.length', count);
});

Then(/^на счётчике '(.*)' из '(.*)' комментариев$/, (current, total) => {
  cy.get('.big-picture .social__comment-shown-count')
    .should('have.text', current);
  cy.get('.big-picture .social__comment-total-count')
    .should('have.text', total);
});

Then(/^комментарий номер '(.*)' содержит аватар '(.*)'$/, (nth, imgUrl) => {
  cy.get('.social__comment')
    .eq(nth - 1)
    .find('.social__picture')
    .should('have.attr', 'src', imgUrl);
});

Then(/^комментарий номер '(.*)' содержит альтернативный текст '(.*)'$/, (nth, alt) => {
  cy.get('.social__comment')
    .eq(nth - 1)
    .find('.social__picture')
    .should('have.attr', 'alt', alt);
});

Then(/^комментарий номер '(.*)' содержит текст '(.*)'$/, (nth, text) => {
  cy.get('.social__comment')
    .eq(nth - 1)
    .find('.social__text')
    .should('have.text', text);
});

When(/^прокручиваю модальное окно$/, () => {
  cy.get('.big-picture').scrollTo('bottom')
});
