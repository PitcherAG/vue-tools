function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/windows phone/i.test(userAgent)) {
        return 'WINDOWS'
    }
    if (/windows/i.test(userAgent)) {
        return 'WINDOWS'
    }
    if (/android/i.test(userAgent)) {
        return 'ANDROID'
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'IOS'
    }
    return 'unknown'
}

export const PLATFORM = getMobileOperatingSystem()
