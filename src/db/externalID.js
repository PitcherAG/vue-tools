export function makeId(lengthV) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < lengthV; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
}

export function generateExternalID() {
    return 'PIT_' + makeId(30)
}
