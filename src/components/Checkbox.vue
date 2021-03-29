<template>
  <div ref="checkbox" class="ui checkbox" v-bind="checkboxAttr">
    <input type="checkbox" tabindex="0" class="hidden" :value="value" :checked="value" />
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types, vue/no-unused-properties */
import { computed, onMounted, watch } from '@vue/composition-api'
import { validateSize } from './mixins'

export default {
  name: 'Checkbox',
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
    },
    radio: Boolean,
    toggle: Boolean,
    slider: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    fitted: Boolean,
    uncheckable: {
      type: Boolean,
      default: true,
    },
    inverted: Boolean,
    size: {
      type: String,
      validator: (val) => validateSize(val, 'Dropdown.vue'),
    },
  },
  emits: ['input', 'beforeChecked', 'onChecked', 'beforeUnchecked', 'onUnchecked'],
  setup(props, { refs, emit, root }) {
    // Validate
    if (props.value === null || props.value === undefined) {
      emit('input', false)
    } else if (typeof props.value === 'string') {
      throw 'Checkbox value type can not be string!'
    }

    const checkboxAttr = computed(() => ({
      class: {
        toggle: !!props.toggle,
        radio: !!props.radio,
        slider: !!props.slider,
        ['read-only']: !!props.readonly,
        disabled: !!props.disabled,
        fitted: !!props.fitted,
        inverted: !!props.inverted,
        [props.size]: !!props.size,
      },
    }))

    const initCheckbox = () => {
      // init
      $(refs.checkbox).checkbox({
        uncheckable: props.uncheckable,
        onChange: () => emit('input', !props.value),
        beforeChecked: () => emit('beforeChecked', props.value),
        onChecked: async () => {
          await root.$nextTick()
          emit('onChecked', props.value)
        },
        beforeUnchecked: () => emit('beforeUnchecked', props.value),
        onUnchecked: async () => {
          await root.$nextTick()
          emit('onUnchecked', props.value)
        },
      })
    }

    onMounted(() => {
      initCheckbox()
    })

    watch(
      () => props.uncheckable,
      () => initCheckbox()
    )

    // execute command with jquery on fomantic
    function exec(comm, arg) {
      if (!arg) {
        return $(refs.checkbox).progress(comm)
      }

      return $(refs.checkbox).progress(comm, arg)
    }

    return { checkboxAttr, exec }
  },
}
</script>
