<template>
    <!-- eslint-disable max-len -->
    <div class="ui sidebar right push wide vertical menu" ref="sidebar">
        <slot />
    </div>
</template>

<script>
import { createStore } from 'pinia'
import { onMounted } from '@vue/composition-api'

function useSidebarStore() {
    return createStore({
        id: 'sidebar',

        state: () => ({
            data: null,
            open: false
        }),
        actions: {
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
    })()
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
