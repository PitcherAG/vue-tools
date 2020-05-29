# Changelog

## 1.3.1

- plural forms for translations works now
- machine translations implemented for .po files
- sidebar component
- checkbox component
- numpadInput component
- fixes Calendar translations bug
- fixes Watcher callbacks for params and serverJSON
- added saveLocal() and loadLocal() functions (saveFromHTML, getFromHTML) with docs

## 1.3.0

- i18n refactor
    you now need to intialize like this:
    ``` javascript
     await loadParams()
     const params = useParamsStore()
     const i18n = useI18nStore()
     await i18n.setLanguage(params.locale.value, true) // true loads translation files
  ```
- iso date format with timezone support for safari
    
## 1.2.3

- bugfixes

## 1.2.2

- our own simple template engine

## 1.2.1

- bugfixes

## 1.2.0

- complete new translation system with gettext support 

## 1.1.5
 - reduces npm file size

## 1.1.4

 - unit tests added
 - unit test coverage added
 - i18n for numbers and currencies
 - docs added
 - serverJSON loading added
