<template>
    <div :class="classList" ref="dropdown">
        <input type="hidden" v-model="value" />
        <i :class="icon + ' icon'"></i>
        <div class="text" v-show="value"></div>
        <div class="default" v-show="!value">{{ defaultText }}</div>
        <i class="remove icon" style="z-index:100"></i>
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
        icon: {
            default: 'dropdown'
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

.ui.clearable.selection.dropdown.labeled i.remove.icon {
    left: auto;
    right: 0;
    font-size: 1em;
}

.ui.dropdown > .remove.icon {
    margin: -0.78571429em !important;
    padding: 0.91666667em !important;
    right: 1.5em !important;
    top: 0.78571429em !important;
    position: absolute !important;
    opacity: 0.6 !important;
    z-index: 3 !important;
}

.ui.dropdown > .icon:not(.dropdown) {
    margin-left: 0.2em;
    margin-right: 0.5em;
}

.ui.multiple.dropdown > .default {
    position: static;
    padding: 0;
    max-width: 100%;
    margin: 0.45238095em 0 0.45238095em 0.64285714em;
    line-height: 1.21428571em;
}

.ui.clearable.dropdown .default,
.ui.clearable.dropdown a:last-of-type {
    margin-right: 0em;
}

.ui.dropdown > .default {
    display: inline-block;
    -webkit-transition: none;
    transition: none;
}
.ui.multiple.dropdown {
    padding-right: 0.5em;
}
</style>
