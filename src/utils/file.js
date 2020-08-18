function isExpiredOrNotReady(now, startDate, endDate) {
    if (typeof startDate === 'undefined' || typeof endDate === 'undefined') return false
    if (startDate == null || endDate == null) return false
    if (startDate == 0 || endDate == 0) return false
    return startDate > now || endDate < now
}

function showInUI(now, file) {
    if (
        file.ID[0] == 'T' ||
        file.typeV == 7 ||
        file.typeV == -1 ||
        file.typeV == 0 ||
        isExpiredOrNotReady(now, file.startDate, file.endDate)
    ) {
        return false
    }
    return true
}

export { showInUI, isExpiredOrNotReady }
