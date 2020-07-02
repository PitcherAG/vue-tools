export function useBrowserLanguage() {
    function getAvailableBrowserLanguage(availableLanguages) {
        return getBrowserLanguages().filter(
            l => availableLanguages.includes(l) || availableLanguages.includes(l.split(/[_-]/)[0])
        )[0]
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

        return [...languages]
    }

    return {
        getAvailableBrowserLanguage,
        getBrowserLanguages
    }
}
