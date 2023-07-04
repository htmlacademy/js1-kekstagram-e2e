Then(/^на странице '(.*)' миниатюр$/, (count) => {
  cy.get('a.picture')
    .should('have.length', count);
});

Then(/^миниатюра номер '(.*)' содержит изображение '(.*)'$/, (nth, imgUrl) => {
  cy.get('a.picture')
    .eq(nth - 1)
    .find('.picture__img')
    .should('have.attr', 'src', imgUrl);
});

Then(/^миниатюра номер '(.*)' содержит альтернативный текст '(.*)'$/, (nth, alt) => {
  cy.get('a.picture')
    .eq(nth - 1)
    .find('.picture__img')
    .should('have.attr', 'alt', alt);
});

Then(/^миниатюра номер '(.*)' содержит '(.*)' лайков$/, (nth, count) => {
  cy.get('a.picture')
    .eq(nth - 1)
    .find('.picture__likes')
    .should('have.text', count);
});

Then(/^миниатюра номер '(.*)' содержит '(.*)' комментариев$/, (nth, count) => {
  cy.get('a.picture')
    .eq(nth - 1)
    .find('.picture__comments')
    .should('have.text', count);
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

When(/^кликаю на миниатюру номер '(.*)'$/, (nth) => {
  cy.get('a.picture')
    .eq(nth - 1)
    .click();
});
