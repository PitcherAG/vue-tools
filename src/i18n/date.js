import { useI18nStore } from './i18n'

export function formatDate(date, showYear = true) {
    const store = useI18nStore()
    let options
    if (showYear) {
        options = { year: '2-digit', month: '2-digit', day: '2-digit' }
    } else {
        options = { month: 'short', day: '2-digit' }
    }
    let locale = store.state.locale
    if (!locale) {
        throw new Error('locale not defined')
    }
    locale = locale.split('_').join('-')
    if (date && date.match(/\d{13}/)) {
        return new Date(Number(date)).toLocaleDateString(locale, options)
    }
    return new Date(date).toLocaleDateString(locale, options)
}
