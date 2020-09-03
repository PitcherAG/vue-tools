<template>
  <button type="button" :class="getClasses" :style="getStyles">{{ label }}</button>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import './button.css';

export default {
    name: 'my-button',

    props: {
        label: {
            type: String,
            required: true,
        },
        primary: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1
            }
        },
        backgroundColor: {
            type: String
        }
    },

  setup(props) {
        const getStyles = computed(() => {
            let style = {}

            style = Object.assign({ backgroundColor: props.backgroundColor }, style)

            return style
        })

        const getClasses = computed(() => {
            return {
                'storybook-button': true,
                'storybook-button--primary': props.primary,
                'storybook-button--secondary': !props.primary,
                [`storybook-button--${props.size}`]: true
            }
        })

        return { getStyles, getClasses }
  }
}
</script>
