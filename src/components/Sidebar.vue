<template>
  <!-- eslint-disable max-len -->
  <div ref="sidebar" class="ui sidebar right wide vertical menu" v-bind="sidebarAttr">
    <slot />
  </div>
</template>

<script>
import { computed, onMounted, shallowRef } from '@vue/composition-api'
import { createStore } from '..'

const useSidebarStore = () => {
  const s = {
    id: 'sidebar',
    state: {
      data: shallowRef(),
      open: false,
    },
    toggle() {
      $('.ui.sidebar').sidebar('toggle')
    },
    show() {
      $('.ui.sidebar').sidebar('show')
    },
    hide() {
      $('.ui.sidebar').sidebar('hide')
    },
  }

  return createStore(s)
}

export default {
  name: 'Sidebar',
  props: {
    type: {
      type: String,
      default: 'push',
    },
  },
  setup(props, ctx) {
    const store = useSidebarStore()

    const sidebarAttr = computed(() => ({
      class: {
        [props.type]: !!props.type,
      },
    }))

    onMounted(() => {
      $(ctx.refs.sidebar).sidebar('setting', 'onChange', () => {
        store.state.open = !store.state.open
      })
    })

    return { sidebarAttr }
  },
  useSidebarStore,
}
</script>

<style lang="scss">
.ui.right.sidebar {
  &.overlay {
    z-index: 2001;
  }

  &.visible {
    box-shadow: 0px 0px 20px #a9acc9;
  }
}
</style>
