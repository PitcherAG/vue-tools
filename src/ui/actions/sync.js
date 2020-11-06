import { fireEvent } from '../../event'
import { query } from '../../db/query'
import { useServerJSONStore } from '../serverJSONStore'

export function showIOSSyncWindow(options) {
    fireEvent('showCachedOrders', options)
}

export async function getiOSSyncEvents(source = 'homescreen') {
    const store = useServerJSONStore()
    const selectQuery = 'SELECT event_name, event_time, lastResponse FROM tbl_reports_v3'
    const events = await query(selectQuery, store.state.appName, false, source)
    store.state.syncEvents = events.map(event => {
        return {
            name: event.event_name,
            time: event.event_time,
            date: event.event_time ? new Date(parseInt(event.event_time)) : ''
        }
    })
    return store.state.syncEvents
}

export async function getWindowsSyncEvents(source = 'homescreen') {
    const store = useServerJSONStore()
    const selectQuery = 'SELECT Name, Time FROM SQLiteEvent'
    const events = await query(selectQuery, store.state.appName, false, source)
    store.state.syncEvents = events.map(event => {
        return { name: event.Name, time: event.Time, date: event.Time ? new Date(parseInt(event.Time)) : '' }
    })
    return store.state.syncEvents
}
