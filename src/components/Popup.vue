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
    position: String
  },
  setup(props, { refs }) {
    onMounted(() => {
      $(refs.trigger).popup({
        on: props.on,
        popup: refs.popup,
        position: 'bottom left'
      })
    })

    onBeforeUnmount(() => {
      $(refs.trigger).popup('destroy')
    })
  }
}
</script>
