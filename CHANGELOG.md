# Changelog

## [Unreleased]
### Changed
- support package translations
- support multiple categories

### Fixed
- store function binding

## 1.3.6

### Added
- fetch polyfill with whatwg-fetch

### Changed
- Store related bugs are fixed
- Dropdown related bugs in ObjectForm / ObjectFormField
- eslint-plugin-vue to 7.0.0-alpha.7
- Dropdown updated
  - emit string as value (Fomantic dropdown default)
  - renamed prop: options -> items
  - renamed prop: textField -> item-text
  - renamed prop: valueField -> item-value
  - renamed prop: setting -> settings

## 1.3.5

### Added
- Dropdown component added
- ProgressBar component added
- added uid function to utils to generate unique ids
- added fetch pollyfill
- should now be windows compatible
- config-gettext-extract, config-gettext-translate and config-gettext-compile commands
- i18n/browser.js to detect browser language
- translate component and directive
- removed pinia

### Changed
- @vue/composition-api to 0.6.6
- DataTable updated
  - use uid for each table row (required for ui)
  - return mapper function as a prop in body slot
- trans to replace placeholders if no translation found
- use impact system language

## 1.3.4

- DataTable updated
  - added searchFor default value
  - added maxWidth property
  - deep object mapping support for dataField in field definition
  - dataField does not support __slot anymore, added slotName property instead
  - better sort functionality
  - support sortType in field definition
  - added dynamic slot property: rowFields
  - dynamic th slots are supported now
- NumpadInput updated
  - v-model supports number as well
  - add document listener to make blur event work
- Dropdown component bugfix
- importing modules with @ were causing error, fixed now
- import lodash modules only instead of whole package
- search threshold decreased to 0.3

## 1.3.3

- added non-exported components -> Popup & Sidebar
- updated dependencies
  - pinia to 0.0.6
  - @pitcher/machine-gettext to 1.1.2
  - @vue/cli-service to 4.4.1
  - eslint to 7.2.0
  - eslint-plugin-vue to 7.0.0-alpha.6
- eslint rules update
- various bug fixes
- DataTable component added
- NumpadInput component updated
  - validation for size prop
  - transparent attr added
  - maxWidth attr added
- new utility search function added

## 1.3.2

- added demo page for future changes & development of UI elements
- NumpadInput component updated
  - minWidth attr added
  - placeholder attr added
  - max attr has not default value anymore
  - z-index: 10000 & user-select: none added
- dropdown multiple support
- partial dropdown search support


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
