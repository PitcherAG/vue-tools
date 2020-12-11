<template>
  <div>
    <slot ref="trigger" />
    <div ref="popup" class="ui popup">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted } from '@vue/composition-api'

export default {
  name: 'popup',
  props: {
    on: String,
    position: {
      type: String,
      default: 'bottom left'
    }
  },
  setup(props, { refs }) {
    onMounted(() => {
      $(refs.trigger).popup({
        on: props.on,
        popup: refs.popup,
        position: props.position
      })
    })

    onBeforeUnmount(() => {
      $(refs.trigger).popup('destroy')
    })
  }
}
</script>
