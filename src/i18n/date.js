import { useParamsStore } from '../params'

export function formatDate(date, showYear = true) {
    const params = useParamsStore()
    let options
    if (showYear) {
        options = { year: '2-digit', month: '2-digit', day: '2-digit' }
    } else {
        options = { month: 'short', day: '2-digit' }
    }
    if (date.match(/\d{13}/)) {
        return new Date(Number(date)).toLocaleDateString(params.locale.value, options)
    }
    return new Date(date).toLocaleDateString(params.locale.value, options)
}
