import { useParamsStore } from '../params'
import moment from 'moment'

export function formatDate(date, showYear = true) {
    const params = useParamsStore()
    if (!date) {
        return ''
    }
    let options
    if (showYear) {
        options = { year: '2-digit', month: '2-digit', day: '2-digit' }
    } else {
        options = { month: 'short', day: '2-digit' }
    }
    if (!params.locale) throw 'locale not defined'
    const m = moment(date)
    const d = m.toDate()
    return d.toLocaleDateString(params.locale, options)
}
