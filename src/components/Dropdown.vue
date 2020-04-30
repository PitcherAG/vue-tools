<template>
    <div :class="classList" ref="dropdown">
        <input type="hidden" v-model="value" />
        <i class="dropdown icon"></i>
        <div class="text" v-show="value"></div>
        <div class="default" v-show="!value">{{ defaultText }}</div>
        <div class="menu">
            <div
                class="item"
                v-for="(option, index) in list"
                :key="index"
                :data-value="option.value"
                :data-text="option.text"
            >
                {{ option.text }}
            </div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, onUpdated } from '@vue/composition-api'

export default {
    props: {
        addClass: {
            type: String
        },
        value: {
            required: true
        },
        defaultText: {
            required: true
        },
        options: {
            required: true
        },
        textField: {
            default: 'text'
        },
        valueField: {
            default: 'value'
        },
        action: {
            type: String,
            default: 'activate'
        },
        setting: {
            type: Object
        }
    },

    setup(props, attrs) {
        const classList = computed(() => {
            let cls = 'ui dropdown '
            if (props.addClass) {
                cls += props.addClass
            } else {
                cls += 'selection '
            }
            if (props.options.length > 10) {
                cls += ' search'
            }
            return cls
        })

        const list = computed(() => {
            if (!props.options) {
                console.error('options is null')
            }

            return props.options.map(option => {
                if (option.constructor === Object) {
                    return {
                        text: option[props.textField],
                        value: option[props.valueField]
                    }
                } else {
                    return {
                        text: option,
                        value: option
                    }
                }
            })
        })

        const initDropdown = () => {
            const settings = $.extend(
                {
                    action: props.action,
                    onChange: function(value, text) {
                        attrs.emit('input', value)
                        attrs.emit('dropdown-selected', text)
                    }
                },
                props.setting
            )

            $(attrs.refs.dropdown).dropdown(settings)
        }
        onMounted(() => {
            initDropdown()
        })
        onUpdated(() => {
            initDropdown()
        })
        return { classList, list, initDropdown }
    }
}
</script>

<style scoped>
.default {
    color: rgba(191, 191, 191, 0.87) !important;
}
</style>
