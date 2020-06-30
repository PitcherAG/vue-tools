<template>
    <!-- eslint-disable max-len -->
    <div class="ui sidebar right push wide vertical menu" ref="sidebar">
        <slot />
    </div>
</template>

<script>
    import { onMounted, ref, shallowRef } from '@vue/composition-api'
    import Vue from 'vue'
    import { createStore } from '..'

    const useSidebarStore = () => {
        const s = {
            id: 'sidebar',
            state: {
                data: shallowRef(),
                open: false
            },
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
        return createStore(s)
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
