import { fireEvent } from './event'

let loaded = false
const keywordDict = {}

async function loadFiles() {
    if (!loaded) {
        const files = await fireEvent('getPitcherFiles', { 'fullData': true })
        for (const file of files) {
            let keywords
            try {
                keywords = file.keywords.split(',').map(f => f.trim())
            } catch (e) {
                keywords = []
            }
            for (const keyword of keywords) {
                if (!keywordDict[keyword]) {
                    keywordDict[keyword] = []
                }
                keywordDict[keyword].push(file)
            }
        }
    }
    loaded = true
}

export async function getFilesWithKeyword(keyword) {
    await loadFiles()
    return keywordDict[keyword]
}
