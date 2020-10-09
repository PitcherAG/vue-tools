import { useI18nStore } from './i18n'
import moment from 'moment'

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
    const m = moment(date)
    const d = m.toDate()
    return d.toLocaleDateString(l, options)
}
