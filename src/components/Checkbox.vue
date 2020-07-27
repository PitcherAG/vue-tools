<template>
    <div ref="checkbox" class="ui toggle checkbox">
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
            required: true
        },
        label: {
            type: String
        }
    },
    setup(props, ctx) {
        if (props.value === null || props.value === undefined) {
            ctx.emit('input', false)
        } else if (typeof props.value === 'string') {
            throw 'Checkbox value type can not be string!'
        }
        onMounted(() => {
            $(ctx.refs.checkbox).checkbox('setting', 'onChange', () => {
                ctx.emit('input', !props.value)
            })
        })
    }
}
</script>
