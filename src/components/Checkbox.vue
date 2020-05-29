<template>
    <div class="ui toggle checkbox" ref="checkbox">
        <input type="checkbox" tabindex="0" class="hidden" :value="value" :checked="value" />
        <label v-if="label">{{ label }}</label>
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'

export default {
    name: 'Checkbox',
    props: {
        value: {
            type: Boolean,
            required: true
        },
        label: {
            type: String
        }
    },
    setup(props, ctx) {
        onMounted(() => {
            $(ctx.refs.checkbox).checkbox('setting', 'onChange', () => {
                ctx.emit('input', !props.value)
            })
        })
    }
}
</script>
