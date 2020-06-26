<template>
    <!-- eslint-disable max-len -->
    <div class="ui sidebar right push wide vertical menu" ref="sidebar">
        <slot />
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import Vue from 'vue'

const s = {
    id: 'sidebar',
    state: () => ({
        data: null,
        open: false
    }),
    toggle() {
        $('.ui.sidebar').sidebar('toggle')
    },
    show() {
        $('.ui.sidebar').sidebar('show')
    },
    hide() {
        $('.ui.sidebar').sidebar('hide')
    }
}

const store = Vue.observable(s)

export const useSidebarStore = () => {
    return store
}

export default {
    name: 'Sidebar',
    setup(props, ctx) {
        const store = useSidebarStore()
        onMounted(() => {
            $(ctx.refs.sidebar).sidebar('setting', 'onChange', () => {
                store.state.open = !store.state.open
            })
        })
    },
    useSidebarStore
}
</script>
