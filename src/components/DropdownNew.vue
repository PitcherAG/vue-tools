<template>
    <div class="ui dropdown pitcher-dropdown" v-bind="dropdownAttr" ref="dropdown">
        <!-- hidden value -->
        <input type="hidden" :value="value" />
        <!-- icon / if selection -->
        <i v-show="selection && !isSearching" :class="[`${icon} icon`, { 'mr-2': icon !== 'dropdown' }]" />

        <!-- search input -->
        <input v-if="searchable" ref="search" class="search" autocomplete="off" tabindex="0" @input="onSearch" />

        <!-- selected text -->
        <div class="text" v-show="value" />

        <!-- placeholder -->
        <div class="default" v-show="!value && !isSearching">{{ defaultText }}</div>
        <!-- icon / if NOT selection -->
        <i v-if="!selection" :class="`${icon} icon`" />
        <!-- remove icon -->
        <i
            v-if="clearable && selection && !loading && value && !isSearching"
            class="remove icon"
            style="z-index: 100; display: inline-block"
            :style="{ right: icon !== 'dropdown' || isSearching ? '1.5em' : undefined }"
        />

        <!-- <div class="menu">
            <div
                class="item"
                v-for="(item, index) in listItems"
                :key="index"
                :data-value="item.value"
                :data-text="item.text"
                :class="{ disabled: item.disabled }"
            >
                <div>
                    <i v-if="item.icon" :class="`${item.icon} icon`" />
                    {{ item.text }}
                </div>
            </div>
        </div> -->
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
        icon: {
            default: 'dropdown'
        },
        fluid: Boolean,
        compact: Boolean,
        selection: {
            type: Boolean,
            default: true
        },
        multiple: Boolean,
        searchable: Boolean,
        clearable: Boolean,
        disabled: Boolean,
        loading: {
            type: Boolean,
            default: false
        },
        error: Boolean,
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
        settings: Object,
        size: {
            type: String,
            validator: val => {
                const valid =
                    val === '' ||
                    val === 'tiny' ||
                    val === 'small' ||
                    val === 'medium' ||
                    val === 'large' ||
                    val === 'big' ||
                    val === 'huge' ||
                    val === 'massive'
                if (!valid) {
                    console.error('[Vue warn]: Validation error in NumpadInput.vue!')
                    console.error('[Vue warn]: prop.size is not valid!')
                    throw `Accepted values: tiny | small | medium | large | big | huge | massive`
                }
                return valid
            }
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
                compact: props.compact,
                search: props.searchable,
                selection: props.selection,
                'not-selection': !props.selection,
                multiple: props.multiple,
                loading: props.loading,
                disabled: props.disabled,
                error: props.error,
                [props.size]: !!props.size
            },
            style: {
                minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
                maxWidth: parsePxStyle(props.maxWidth)
            }
        }))

        const listItems = computed(() => {
            return props.items.map(item => {
                if (item.constructor === Object) {
                    return {
                        text: item[props.itemText],
                        value: item[props.itemValue],
                        icon: item.icon ? item.icon : null,
                        disabled: item.disabled
                    }
                } else {
                    return {
                        text: item,
                        value: item
                    }
                }
            })
        })

        function mapItems() {
            return props.items.map(item => {
                if (item.constructor === Object) {
                    return {
                        name: item[props.itemText],
                        value: item[props.itemValue],
                        type: item.type ? item.type : 'item',
                        icon: item.icon,
                        image: item.image,
                        disabled: item.disabled,
                        selected: item.selected,
                    }
                } else {
                    return {
                        text: item,
                        value: item
                    }
                }
            })
        }

        const initDropdown = () => {
            const settings = $.extend(
                {
                    action: props.action,
                    onChange: (value, text) => {
                        emit('input', value)
                        emit('onSelected', text)
                        console.log('set value', value)
                    },
                    values: mapItems()
                },
                props.settings
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
            // initDropdown()
        })

        return { ...toRefs(state), dropdownAttr, listItems, initDropdown, onSearch }
    }
}
</script>

<style lang="scss" scoped>
.ui.dropdown.pitcher-dropdown {
    .default {
        color: rgba(191, 191, 191, 0.87) !important;
        display: inline-block;
    }

    &.not-selection:not(.labeled) {
        // any icon other than .dropdown
        & > .icon:not(.dropdown) {
            margin-left: 8px;
            margin-right: 0;
        }

        & > .icon.dropdown {
            margin: 0 0.2em 0 1em;
        }
    }

    &.multiple {
        .default {
            padding-top: 8px;
            padding-left: 8px;
        }
    }
}
</style>
