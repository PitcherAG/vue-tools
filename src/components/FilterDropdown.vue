<template>
    <div class="ui dropdown pitcher-filter" ref="filter" :class="{ fluid }">
        <div class="ui buttons" :class="{ fluid }" :style="{ minWidth: minWidth ? parsePxStyle(minWidth) : undefined }">
            <button class="ui button" v-bind="buttonAttr" ref="button">
                <div class="d-flex">
                    <i class="icon" :class="icon" />
                    <span class="button-text">{{ buttonText }}</span>
                    <span class="ml-1">{{ hasMoreSelected }}</span>
                </div>
                <i
                    v-if="!value.length"
                    class="chevron icon right-icon"
                    :class="{ down: !menuIsOpen, up: menuIsOpen }"
                />
            </button>
            <template v-if="value.length > 0">
                <!-- clear button -->
                <button
                    v-if="value.length > 0"
                    class="ui icon button"
                    :class="buttonAttr.class"
                    style="flex: 0;"
                    @click.stop="reset"
                >
                    <i class="times icon right-icon" />
                </button>
            </template>
        </div>
        <div v-bind="menuAttr">
            <div class="h-container d-flex align-items-center pa-3">
                <h3 class="ui header ma-0">
                    {{ title }}
                    <div v-if="value.length" class="ui circular label" :class="{ [color]: !!color, grey: !color }">
                        {{ value.length }}
                    </div>
                </h3>
                <!-- Close button -->
                <i class="times icon thin ml-auto" style="cursor: pointer; font-size: 1.1em" @click="closeMenu" />
            </div>
            <!-- actions -->
            <div class="a-container mb-4">
                <a href="#" @click="selectAll">
                    <span class="ui text" :class="{ [color]: !!color }">Select all</span>
                </a>
                <span class="ui large grey text mx-2">|</span>
                <a href="#" @click="reset">
                    <span class="ui text" :class="{ [color]: !!color }">Reset</span>
                </a>
            </div>
            <div class="s-container mb-4">
                <div class="ui fluid icon small input">
                    <input type="text" placeholder="Search" />
                    <i v-if="searchKey" class="times thin icon" @click="searchKey = ''" />
                </div>
            </div>
            <!-- Items -->
            <div class="ui grid fluid vertical menu sub-menu" :style="{ maxHeight: parsePxStyle(scrollHeight) }">
                <div
                    v-for="(item, index) in listItems"
                    :key="index"
                    :class="[item.type, { disabled: item.disabled, active: isSelected(item) }]"
                    @click.stop="item.type === 'item' ? handleItemClick(item) : undefined"
                >
                    <!-- if this is an item -->
                    <template v-if="item.type === 'item'">
                        <div class="ui checkbox">
                            <input type="checkbox" name="example" :checked="isSelected(item)" />
                            <label>{{ item.text }}</label>
                        </div>
                        <div v-if="item.description" class="description">{{ item.description }}</div>
                    </template>
                    <template v-else>{{ item.text }}</template>
                </div>
            </div>
            <!-- Close button -->
            <div class="pa-2">
                <button class="ui basic button fluid" @click="closeMenu">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, reactive, toRefs, onMounted, watch } from '@vue/composition-api'
import { parsePxStyle, validateSize, countLines } from './mixins'
import { search } from '../utils'

export default {
    props: {
        value: {
            required: true
        },
        title: String,
        items: {
            type: Array,
            required: false
        },
        itemText: {
            default: 'text'
        },
        itemValue: {
            default: 'value'
        },
        returnType: {
            type: String,
            default: 'value'
        },
        icon: {
            default: 'filter'
        },
        fluid: Boolean,
        basic: Boolean,
        minWidth: {
            type: [String, Number]
        },
        menuMinWidth: {
            type: [String, Number],
            default: 300
        },
        scrollHeight: {
            type: [String, Number],
            default: 250
        },
        color: String,
        size: {
            type: String,
            validator: val => validateSize(val, 'Dropdown.vue')
        }
    },

    setup(props, { refs, emit, slots, root }) {
        // local state
        const state = reactive({
            searchKey: '',
            menuIsOpen: false,
            hasMoreSelected: null,
            buttonText: props.title,
            isSingleItem: false,
            hasCustomIcon: props.icon !== 'filter',
            hasDefaultSlot: !!slots.default
        })

        const buttonAttr = computed(() => ({
            class: {
                basic: props.basic,
                [props.color]: !!props.color,
                active: props.basic && props.value.length > 0,
                ['right labeled icon']: !props.value.length
            },
            style: {
                flex: 1,
                paddingLeft: '8px !important',
                textAlign: 'left',
                overflow: 'hidden'
            }
        }))

        const menuAttr = computed(() => ({
            class: {
                ['ui grid fluid vertical menu mt-2']: true
            },
            style: {
                minWidth: props.menuMinWidth ? parsePxStyle(props.menuMinWidth) : undefined
            }
        }))

        // TODO: SEARCH
        // search(temp, props.searchFor, props.searchFields)

        // transform list items for dropdown
        const listItems = computed(() => {
            if (!props.items) {
                return []
            }
            return props.items.map(item => {
                if (item.constructor === Object) {
                    return {
                        text: item[props.itemText],
                        value: item[props.itemValue],
                        type: item.type ? item.type : 'item',
                        description: item.description,
                        disabled: item.disabled
                    }
                } else {
                    // if not key/value pair
                    state.isSingleItem = true
                    return {
                        text: item,
                        value: item,
                        type: 'item'
                    }
                }
            })
        })

        // value watcher
        watch(
            () => props.value,
            async () => {
                console.log('change')
                if (!props.value.length) {
                    state.buttonText = props.title
                    state.hasMoreSelected = ''
                    return
                }

                state.buttonText = ''

                const selectedItems = listItems.value.filter(i => isSelected(i)).map(i => i.text)
                let lineBreakIndex = 0
                let hasLineBreak = false

                for (const [index, text] of selectedItems.entries()) {
                    state.buttonText += index === 0 ? `${text}` : `, ${text}`
                    await root.$nextTick()
                    if (countLines(refs.button) > 1) {
                        lineBreakIndex = index
                        hasLineBreak = true
                        console.log('HOOO', index)
                        break
                    }
                }

                // has line break
                if (hasLineBreak) {
                    console.log(selectedItems.slice(0, lineBreakIndex))
                    state.buttonText =
                        lineBreakIndex === 0
                            ? selectedItems.join(', ')
                            : selectedItems.slice(0, lineBreakIndex).join(', ')
                    state.hasMoreSelected = ` +${selectedItems.slice(lineBreakIndex).length}`
                } else {
                    state.hasMoreSelected = ''
                }
            }
        )

        // const dropdownAttr = computed(() => ({
        //     class: {
        //         fluid: props.fluid,
        //         compact: props.compact,
        //         search: props.searchable,
        //         // false by default if default slot is used
        //         selection: state.hasDefaultSlot ? false : props.selection,
        //         'not-selection': !props.selection,
        //         multiple: props.multiple,
        //         loading: props.loading,
        //         disabled: props.disabled || props.loading,
        //         error: props.error,
        //         [props.color]: !!props.color,
        //         [props.size]: !!props.size
        //     },
        //     style: {
        //         minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
        //         maxWidth: parsePxStyle(props.maxWidth)
        //     }
        // }))

        // fomantic dropdown initialization
        const initFilter = () => {
            // initialize
            $(refs.filter).dropdown({
                onShow: () => {
                    state.menuIsOpen = true
                    refresh()
                },
                onHide: () => {
                    state.menuIsOpen = false
                    refresh()
                }
            })
        }

        const refresh = () => {
            $(refs.filter).dropdown('refresh')
        }

        const closeMenu = () => {
            $(refs.filter).dropdown('hide')
        }

        const isSelected = item => {
            if (props.returnType === 'object') {
                return props.value.some(i => i.value === item.value)
            }
            return props.value.includes(item[props.returnType])
        }

        // handle item click, without preventing default event
        function handleItemClick(item) {
            // select
            if (!isSelected(item)) {
                return props.returnType === 'object'
                    ? emit('input', [...props.value, item])
                    : emit('input', [...props.value, item[props.returnType]])
            }

            // unselect
            return props.returnType === 'object'
                ? emit(
                      'input',
                      props.value.filter(i => i.value !== item.value)
                  )
                : emit(
                      'input',
                      props.value.filter(v => v !== item[props.returnType])
                  )
        }

        function selectAll() {
            const notSelectedItems = listItems.value
                .filter(i => !i.disabled)
                .filter(i => i.type === 'item')
                .filter(i => !isSelected(i))
            return props.returnType === 'object'
                ? emit('input', [...props.value, ...notSelectedItems])
                : emit('input', [...props.value, ...notSelectedItems.map(i => i[props.returnType])])
        }

        function reset() {
            emit('input', [])
        }

        onMounted(() => {
            // save initial button width
            refs.filter.style.maxWidth = window.getComputedStyle(refs.button).width
            console.log('width', window.getComputedStyle(refs.button).width)
            // init
            initFilter()
        })

        return {
            ...toRefs(state),
            menuAttr,
            buttonAttr,
            listItems,
            initFilter,
            handleItemClick,
            closeMenu,
            selectAll,
            reset,
            isSelected,
            emit,
            refresh,
            parsePxStyle
        }
    }
}
</script>

<style lang="scss" scoped>
.ui.dropdown.pitcher-filter {
    .ui.buttons {
        max-width: 100%;

        & > button {
            width: 100%;

            &.basic:hover {
                background-color: inherit;
            }

            .button-text {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .right-icon {
            background: transparent !important;
            background-color: transparent !important;
            top: 1px;
            height: calc(100% - 2px);
            right: 1px;
        }
    }

    .sub-menu {
        display: block !important;
        position: relative;
        margin: 0 !important;
        left: 0;
        box-shadow: none !important;
        border: none !important;
        overflow-y: auto;
        min-width: inherit;

        .item {
            font-size: 1rem !important;
            white-space: pre-wrap;

            label:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
