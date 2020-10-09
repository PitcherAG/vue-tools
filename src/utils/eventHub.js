// Create the event bus by creating a new Vue instance and
// binding it somehwere accessible. If you bind it to the
// Vue prototype, you can access it within your components
// like this:
//
// Emit an event
// this.$bus.$emit('myEvent', {data: true})
//
// React to an event
// this.$bus.$on('myEvent', (message) => {console.log(message})
import Vue from 'vue'

export const eventHub = new Vue({})
