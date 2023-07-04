Feature: 3. Отправка данных на сервер

  Scenario: 3.1. Отправка данных формы
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.scale__control--smaller'
    When кликаю по элементу '.effects__preview--chrome'
    When в поле '.text__hashtags' ввожу текст '#test #tag'
    When в поле '.text__description' ввожу текст 'test comment'
    When кликаю по элементу '.img-upload__submit'
    Then форма успешно отправлена с масштабом '75%', эффектом 'chrome', комментарием 'test comment' и тэгами '#test #tag'

  Scenario: 3.1. На время отправки кнопка блокируется
    Given данные отправляются с задержкой
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    Then кнопка '.img-upload__submit' разблокирована
    When кликаю по элементу '.img-upload__submit'
    Then кнопка '.img-upload__submit' заблокирована
    When данные отправлены
    Then кнопка '.img-upload__submit' разблокирована

  Scenario: 3.2. Неправильно заполненную форму невозможно отправить
    Given данные не должны отправляться
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When в поле '.text__hashtags' ввожу текст '#'
    When кликаю по элементу '.img-upload__submit'
    When в поле '.text__description' ввожу текст 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel eros nulla. Etiam nec sodales leo. Ut facilisis orci non dolor dapibus nec.'
    When кликаю по элементу '.img-upload__submit'

  Scenario: 3.2. Сообщения об ошибках различаются
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When в поле '.text__hashtags' ввожу текст '#'
    When кликаю по элементу '.img-upload__submit'
    Then запоминаю ошибку
    When в поле '.text__hashtags' ввожу текст '#q #w #e #r #t #y'
    When кликаю по элементу '.img-upload__submit'
    Then запоминаю ошибку
    When в поле '.text__hashtags' ввожу текст '#q #Q'
    When кликаю по элементу '.img-upload__submit'
    Then запоминаю ошибку
    Then ошибки различаются

  Scenario: 3.3. При успешной отправке форма очищается и закрывается
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.scale__control--smaller'
    When кликаю по элементу '.effects__preview--chrome'
    When в поле '.text__hashtags' ввожу текст '#test #tag'
    When в поле '.text__description' ввожу текст 'test comment'
    When кликаю по элементу '.img-upload__submit'
    Then форма успешно отправлена с масштабом '75%', эффектом 'chrome', комментарием 'test comment' и тэгами '#test #tag'
    Then элемент '.img-upload__overlay' невидим
    Then элемент 'body' не содержит класс 'modal-open'
    Then значение поля '.scale__control--value' равно '100%'
    Then значение поля '.text__hashtags' равно ''
    Then значение поля '.text__description' равно ''
    Then значение поля '.img-upload__input' равно ''
    Then выбран эффект «Оригинал»

  Scenario: 3.4. Eсли отправка данных прошла успешно, показывается соответствующее сообщение
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    When данные отправлены
    Then элемент '.success' видим

  Scenario: 3.4. Cообщение об успехе исчезает после нажатия на кнопку
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    When данные отправлены
    Then элемент '.success' видим
    When кликаю по элементу '.success__button'
    Then элемента '.success' нет на странице

  Scenario: 3.4. Cообщение об успехе исчезает по нажатию на клавишу Esc
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    When данные отправлены
    Then элемент '.success' видим
    When нажимаю клавишу 'esc'
    Then элемента '.success' нет на странице

  Scenario: 3.4. Cообщение об успехе исчезает по клику на произвольную область экрана
    Given наблюдаю за POST запросами на сервер
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    When данные отправлены
    Then элемент '.success' видим
    When кликаю по элементу '.success__inner'
    Then элемент '.success' видим
    When кликаю по подложке '.success'
    Then элемента '.success' нет на странице

  Scenario: 3.5. Если при отправке данных произошла ошибка, показывается соответствующее сообщение
    Given сервер не отвечает
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.error' видим

  Scenario: 3.5. Cообщение об ошбике исчезает после нажатия на кнопку
    Given сервер не отвечает
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.error' видим
    When кликаю по элементу '.error__button'
    Then элемента '.error' нет на странице

  Scenario: 3.5. Cообщение об ошибке исчезает по нажатию на клавишу Esc, но форма остаётся
    Given сервер не отвечает
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.error' видим
    When нажимаю клавишу 'esc'
    Then элемента '.error' нет на странице
    Then элемент '.img-upload__overlay' видим

  Scenario: 3.5. Cообщение об ошибке исчезает по клику на произвольную область экрана
    Given сервер не отвечает
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.error' видим
    When кликаю по элементу '.error__inner'
    Then элемент '.error' видим
    When кликаю по подложке '.error'
    Then элемента '.error' нет на странице

  Scenario: 3.5. Если при отправке данных произошла ошибка, форма не сбрасывается
    Given сервер не отвечает
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.scale__control--smaller'
    When кликаю по элементу '.effects__preview--chrome'
    When в поле '.text__hashtags' ввожу текст '#test #tag'
    When в поле '.text__description' ввожу текст 'test comment'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.error' видим
    When кликаю по элементу '.error__button'
    Then элемента '.error' нет на странице
    Then элемент '.img-upload__overlay' видим
    Then значение поля '.scale__control--value' равно '75%'
    Then значение поля '.text__hashtags' равно '#test #tag'
    Then значение поля '.text__description' равно 'test comment'
    Then заполнено поле загрузки файла

  Scenario: 3.6. При отмене форма закрывается и очищается
    Given нахожусь на главной странице сайта
    Given выбираю изображение для загрузки
    When кликаю по элементу '.scale__control--smaller'
    When кликаю по элементу '.effects__preview--chrome'
    When в поле '.text__hashtags' ввожу текст '#'
    When в поле '.text__description' ввожу текст 'test comment'
    When кликаю по элементу '.img-upload__cancel'
    Then элемент '.img-upload__overlay' невидим
    Then элемент 'body' не содержит класс 'modal-open'
    Then значение поля '.scale__control--value' равно '100%'
    Then значение поля '.text__hashtags' равно ''
    Then значение поля '.text__description' равно ''
    Then значение поля '.img-upload__input' равно ''
    Then выбран эффект «Оригинал»
    Then элемента '.pristine-error' нет на странице
