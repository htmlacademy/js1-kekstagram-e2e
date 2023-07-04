import { Then } from 'cypress-cucumber-preprocessor/steps';

Then(/^фильтр '(.*)' активен$/, (filterName) => {
  cy.get('.img-filters__form')
    .contains(filterName)
    .should('have.class', 'img-filters__button--active');
});

Then(/^миниатюры не повторяются$/, () => {
  const images = new Set();
  cy.get('.picture .picture__img')
    .each(($picture) => {
      expect(images.has($picture.attr('src'))).to.be.equal(false);
      images.add($picture.attr('src'));
    });
});

Then(/^миниатюры отрисованы не в первоначальном порядке$/, () => {
  const images = [];
  cy.get('.picture .picture__img')
    .each(($picture) => {
      images.push($picture.attr('src'));
    })
    .then(() => {
      expect(images.some((src, index) => src !== `photos/${index}.jpg`))
        .to.be.equal(true);
    });
});

Then(/^подменяю таймеры$/, () => {
  cy.clock();
});

Then(/^тикаю на (\d+)ms$/, (ms) => {
  cy.tick(ms);
});
