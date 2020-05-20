import { useParamsStore } from '../params'
import { useI18nStore } from './i18n'

const currencyDict = {
    Euro: 'EUR',
    'U.S. Dollar': 'USD'
}

export function formatCurrency(value, currency) {
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
        throw new Error('locale not defined')
    }
    locale = locale.split('_').join('-')
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

export function formatDecimal(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
    const store = useI18nStore()
    let locale = store.state.locale
    if (!locale) {
        throw new Error('locale not defined')
    }
    locale = locale.split('_').join('-')
    return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}

export function formatPercent(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
    const store = useI18nStore()
    let locale = store.state.locale
    if (!locale) {
        throw new Error('locale not defined')
    }
    locale = locale.split('_').join('-')
    return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(value)
}
