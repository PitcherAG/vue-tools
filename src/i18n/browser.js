export function useBrowserLanguage() {
    function getAvailableBrowserLanguage(availableLanguages) {
        return getBrowserLanguages().find(l => availableLanguages.includes(l))
    }

    function getBrowserLanguages() {
        const languages = new Set()

        if (typeof navigator !== 'undefined') {
            if (navigator.languages) {
                for (let i = 0; i < navigator.languages.length; i++) {
                    languages.add(navigator.languages[i])
                }
            }

            ;['language', 'browserLanguage', 'systemLanguage', 'userLanguage'].forEach(prop => {
                if (navigator[prop]) {
                    languages.add(navigator[prop])
                }
            })
        }

        for (const l of languages.values()) {
            languages.add(l.split('-')[0])
        }

        return [...languages]
    }

    return {
        getAvailableBrowserLanguage,
        getBrowserLanguages
    }
}
