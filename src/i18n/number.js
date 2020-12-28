import { useParamsStore } from '../params'
import { useI18nStore } from '../i18n/i18n'
import { PLATFORM } from '../platform'

const currencyDict = {
  Euro: 'EUR',
  'U.S. Dollar': 'USD'
}

const currencyDisplayTypes = ['symbol', 'name', 'code']

export function formatCurrency(value, currency, currencyDisplay = 'symbol') {
  const locale = useParamsStore().locale || useI18nStore().state.locale

  const params = useParamsStore()
  if (!currency) {
    if (params.state.account) {
      currency = params.state.account.CurrencyIsoCode
    }
  }
  if (currency.length > 3) {
    currency = currencyDict[currency]
  }
  const minus = value < 0
  if (minus) {
    value *= -1
  }

  if (currencyDisplayTypes.indexOf(currencyDisplay) === -1) {
    throw `Provided currency display type is invalid. Possible values are: ${currencyDisplayTypes.join(', ')}`
  }

  if (!locale) throw 'locale not defined'
  let result = new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay }).format(value)
  if (minus) {
    // IE11 bullshit
    result = '-' + result
  }
  if (PLATFORM === 'WINDOWS') {
    result = result.split(currency.toUpperCase()).join(currency.toUpperCase() + ' ')
  }
  return result
}

export function formatDecimal(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
  const locale = useParamsStore().locale || useI18nStore().state.locale

  if (!locale) throw 'locale not defined'
  return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}

export function formatPercent(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
  const locale = useParamsStore().locale || useI18nStore().state.locale

  if (!locale) throw 'locale not defined'
  return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}
