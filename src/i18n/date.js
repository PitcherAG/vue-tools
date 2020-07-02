import { useI18nStore } from './i18n'
import { DateTime } from 'luxon'

export function formatDate(date, showYear = true) {
    if (!date) {
        return ''
    }
    const store = useI18nStore()
    let options
    if (showYear) {
        options = { year: '2-digit', month: '2-digit', day: '2-digit' }
    } else {
        options = { month: 'short', day: '2-digit' }
    }
    const locale = store.state.locale
    if (!locale) {
        throw new Error('locale not defined')
    }
    const l = locale.split('_').join('-')
    const dt = DateTime.fromISO(date, { locale: l })
    return dt.toLocaleString(options) //=> 'April 20'(l, options)
}
