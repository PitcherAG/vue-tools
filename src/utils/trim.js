export function trimChar(string, character, right = true) {
    const first = [...string].findIndex((char) => char !== character)
    const last = right ? [...string].reverse().findIndex((char) => char !== character) : 0
    return string.substring(first, string.length - last)
}
