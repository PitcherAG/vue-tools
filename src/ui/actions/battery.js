import { useServerJSON } from '../serverJSONStore'

window.setBatteryLevel = function(level) {
    const state = useServerJSON()
    state.batteryLevel = level
}
