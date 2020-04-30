import { useParamsStore } from '../params'

const currencyDict = {
    Euro: 'EUR',
    'U.S. Dollar': 'USD',
}

export function formatCurrency(value, currency) {
    const params = useParamsStore()
    if (!currency) {
        currency = params.state.account.CurrencyIsoCode
    }
    if (currency.length > 3) {
        currency = currencyDict[currency]
    }
    return new Intl.NumberFormat(params.locale.value, { style: 'currency', currency }).format(value)
}

export function formatDecimal(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
    const params = useParamsStore()
    return new Intl.NumberFormat(params.locale.value, { maximumFractionDigits, minimumFractionDigits }).format(value)
}

export function formatPercent(value, maximumFractionDigits = 1, minimumFractionDigits = 0) {
    const params = useParamsStore()
    return new Intl.NumberFormat(params.locale.value, { maximumFractionDigits, minimumFractionDigits }).format(value)
}
