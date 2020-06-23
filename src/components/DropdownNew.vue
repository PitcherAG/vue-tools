<template>
    <div class="ui dropdown" v-bind="dropdownAttr" ref="dropdown">
        <!-- hidden value -->
        <input type="hidden" :value="value" />
        <!-- append icon -->
        <i :class="`${appendIcon} icon`" />

        <!-- search input -->
        <input v-if="searchable" ref="search" class="search" autocomplete="off" tabindex="0" />

        <!-- selected text -->
        <div class="text" v-show="value" />

        <!-- placeholder -->
        <div class="default" v-show="!value && !isSearching">{{ defaultText }}</div>

        <!-- remove icon -->
        <i v-if="clearable && value" class="remove icon" style="z-index: 100; display: inline-block" />

        <div class="menu">
            <div
                class="item"
                v-for="(item, index) in listItems"
                :key="index"
                :data-value="item.value"
                :data-text="item.text"
            >
                <i v-if="item.icon" :class="`${item.icon} icon`" />
                {{ item.text }}
            </div>
        </div>
    </div>
</template>
<script>
import { computed, reactive, toRefs, onMounted, onUpdated } from '@vue/composition-api'

const parsePxStyle = val => {
    return val.toString().includes('%') || val.toString().includes('px') ? val : `${parseInt(val)}px`
}

export default {
    props: {
        value: {
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        itemText: {
            default: 'text'
        },
        itemValue: {
            default: 'value'
        },
        appendIcon: {
            default: 'dropdown'
        },
        fluid: Boolean,
        selection: {
            type: Boolean,
            default: true
        },
        searchable: Boolean,
        clearable: Boolean,
        disabled: Boolean,
        defaultText: {
            type: String,
            default: 'Select'
        },
        minWidth: {
            type: [Number, String]
        },
        maxWidth: {
            type: [Number, String],
            default: '100%'
        },
        action: {
            type: String,
            default: 'activate'
        },
        setting: {
            type: Object
        }
    },

    setup(props, { refs, emit }) {
        // local state
        const state = reactive({
            isSearching: false
        })

        const dropdownAttr = computed(() => ({
            class: {
                fluid: props.fluid,
                search: props.searchable,
                selection: props.selection
            },
            style: {
                minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
                maxWidth: parsePxStyle(props.maxWidth)
            }
        }))

        const listItems = computed(() => {
            if (!props.items) {
                console.error('items is null')
            }

            return props.items.map(option => {
                if (option.constructor === Object) {
                    return {
                        text: option[props.itemText],
                        value: option[props.itemValue],
                        icon: option.icon ? option.icon : null
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
                    onChange: (value, text) => {
                        emit('input', value)
                        emit('dropdown-selected', text)
                        console.log('set value', value)
                    }
                },
                props.setting
            )
            $(refs.dropdown).dropdown(settings)
        }

        const onSearch = e => {
            state.isSearching = refs.search && !!refs.search.value
            console.log('isSearching', state.isSearching)
        }

        onMounted(() => {
            initDropdown()
        })
        onUpdated(() => {
            initDropdown()
        })
        return { ...toRefs(state), dropdownAttr, listItems, initDropdown, onSearch }
    }
}
</script>

<style scoped>
.default {
    color: rgba(191, 191, 191, 0.87) !important;
}
</style>
