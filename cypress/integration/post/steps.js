import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^наблюдаю за POST запросами на сервер$/, () => {
  cy.intercept('POST', 'https://*.javascript.pages.academy/kekstagram').as('postData');
});

Then(/^форма успешно отправлена с масштабом '(.*)', эффектом '(.*)', комментарием '(.*)' и тэгами '(.*)'$/, (scale, effect, comment, hashtags) => {
  cy.wait('@postData')
    .should(({request, response}) => {
      expect(request.headers['content-type']).to.include('multipart/form-data;');
      expect(response.body.files[0].filename).to.eq('JavaScript-logo.png');
      expect(response.body.description).to.eq(comment);
      expect(response.body.effect).to.eq(effect);
      expect(response.body.hashtags).to.eq(hashtags);
      expect(response.body.scale).to.eq(scale);
    });
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

Given(/^данные отправляются с задержкой$/, () => {
  cy.intercept({
    method: 'POST',
    url: 'https://*.javascript.pages.academy/kekstagram',
  }, {
    statusCode: 200,
    delayMs: 500,
  })
    .as('postData');
});

Given(/^сервер не отвечает$/, () => {
  cy.intercept({
    method: 'POST',
    url: 'https://*.javascript.pages.academy/kekstagram',
  }, {
    statusCode: 500,
  })
    .as('postData');
});

When(/^данные отправлены$/, () => {
  cy.wait('@postData').its('response.statusCode').should('eql', 200);
});

Given(/^данные не должны отправляться$/, () => {
  cy.intercept('POST', 'https://*.javascript.pages.academy/kekstagram', () => {
    throw new Error('Данные отправлены!');
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
  expect(errorSet.size <= 3).to.be.equal(true);
  errorSet.clear();
});

Then(/^выбран эффект «Оригинал»$/, () => {
  cy.get('#effect-none').should('be.checked');
});

