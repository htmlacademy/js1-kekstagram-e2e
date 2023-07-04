Feature: 1. Загрузка нового изображения на сайт и заполнение информации о нём

  Background: Открываю сайт и загружаю изображение
    Given нахожусь на главной странице сайта
    Then элемент '.img-upload__overlay' невидим
    Given выбираю изображение для загрузки

  Scenario: 1.2 Открытие формы редактирования
    Then элемент '.img-upload__overlay' видим
    Then элемент 'body' содержит класс 'modal-open'
    Then заполнено поле загрузки файла
    Then подставляется превью изображения
    Then изображение подставляется в превью эффектов

  Scenario: 1.3 Закрытие формы редактирования по нажатию на элемент '.img-upload__cancel'
    Then элемент '.img-upload__overlay' видим
    When кликаю по элементу '.img-upload__cancel'
    Then элемент '.img-upload__overlay' невидим
    Then элемент 'body' не содержит класс 'modal-open'

  Scenario: 1.3 Закрытие формы редактирования по нажатию на Escape
    Then элемент '.img-upload__overlay' видим
    When нажимаю клавишу 'esc'
    Then элемент '.img-upload__overlay' невидим
    Then элемент 'body' не содержит класс 'modal-open'

  Scenario: 1.2 Повторная загрузка изображения
    Then элемент '.img-upload__overlay' видим
    When нажимаю клавишу 'esc'
    Then элемент '.img-upload__overlay' невидим
    Then значение поля '.img-upload__input' равно ''
    Then выбираю изображение для загрузки
    Then элемент '.img-upload__overlay' видим
