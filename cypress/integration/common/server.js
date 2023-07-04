const baseApiUrl = Cypress.config('baseApiUrl');
const APIRoute = {
  GET: `${baseApiUrl}/data`,
  POST: `${baseApiUrl}/`,
};

Given(/^подменяю запрос на загрузку данных$/, () => {
  cy.intercept(
    'GET',
    APIRoute.GET,
    {fixture: 'data.json'}
  ).as('getData');
});

Given(/^сервер не отдаёт изображения других пользователей$/, () => {
  cy.intercept({
    method: 'GET',
    url: APIRoute.GET,
  }, {
    statusCode: 500,
  })
    .as('getData');
});

When(/^запрос на загрузку данных завершён$/, () => {
  cy.wait('@getData');
});

Given(/^подменяю запрос на отправку данных$/, () => {
  cy.intercept('POST', APIRoute.POST).as('postData');
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

Given(/^данные отправляются с задержкой$/, () => {
  cy.intercept({
    method: 'POST',
    url: APIRoute.POST,
  }, {
    statusCode: 200,
    delayMs: 500,
  })
    .as('postData');
});

Given(/^сервер не принимает данные$/, () => {
  cy.intercept({
    method: 'POST',
    url: APIRoute.POST,
  }, {
    statusCode: 500,
  })
    .as('postData');
});

When(/^запрос на отправку данных завершён$/, () => {
  cy.wait('@postData').its('response.statusCode').should('eql', 200);
});

Given(/^данные не должны отправляться$/, () => {
  cy.intercept('POST', APIRoute.POST, () => {
    throw new Error('Данные отправлены!');
  });
});
