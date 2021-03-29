import { useSystemStore } from '../stores/index'

window.setBatteryLevel = function(level) {
  const store = useSystemStore()

  store.state.batteryLevel = level
}
