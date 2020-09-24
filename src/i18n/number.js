import { useParamsStore } from '../params'
import { useI18nStore } from './i18n'
import { PLATFORM } from '../platform'

const currencyDict = {
    Euro: 'EUR',
    'U.S. Dollar': 'USD'
}

export function formatCurrency(value, currency, currencyDisplay = 'symbol') {
    const store = useI18nStore()
    if (!currency) {
        const params = useParamsStore()
        currency = params.state.account.CurrencyIsoCode
    }
    if (currency.length > 3) {
        currency = currencyDict[currency]
    }
    let locale = store.state.locale
    if (!locale) {
        throw 'locale not defined'
    }
    locale = locale.split('_').join('-')
    const minus = value < 0
    if (minus) {
        value *= -1
    }
    let result = new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay }).format(
        value
    )
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
    const store = useI18nStore()
    let locale = store.state.locale
    console.log(locale)
    if (!locale) {
        throw 'locale not defined'
    }
    locale = locale.split('_').join('-')
    return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}

export function formatPercent(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
    const store = useI18nStore()
    let locale = store.state.locale
    if (!locale) {
        throw 'locale not defined'
    }
    locale = locale.split('_').join('-')
    return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}
