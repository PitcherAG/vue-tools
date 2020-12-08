import { useServerJSON } from '../serverJSON'

window.setBatteryLevel = function(level) {
    const state = useServerJSON()
    state.batteryLevel = level
}
