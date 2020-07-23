<template>
    <div class="ui dropdown pitcher-filter" ref="filter">
        <button class="ui right labeled icon button" v-bind="buttonAttr">
            <span><i class="filter icon" /> {{ title }}</span>
            <i class="chevron down icon" />
        </button>
        <div v-bind="menuAttr">
            <div class="h-container d-flex align-items-center pa-3">
                <h3 class="ui header ma-0">
                    {{ title }}
                    <div class="ui grey circular label">2</div>
                </h3>
                <!-- Close button -->
                <i class="times icon thin ml-auto" style="cursor: pointer; font-size: 1.1em" @click="closeMenu" />
            </div>
            <!-- actions -->
            <div class="a-container mb-4">
                <a href="#">Select all</a>
                <span class="ui large grey text mx-2">|</span>
                <a href="#">Reset</a>
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
                    :class="[item.type, { disabled: item.disabled, active: isSelected(item)}]"
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
import { computed, reactive, toRefs, onMounted } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'
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
        minWidth: {
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

    setup(props, { refs, emit, slots }) {
        // local state
        const state = reactive({
            searchKey: '',
            isSingleItem: false,
            hasCustomIcon: props.icon !== 'filter',
            hasDefaultSlot: !!slots.default
        })

        const buttonAttr = computed(() => ({
            class: {
                [props.color]: !!props.color
            },
            style: {
                paddingLeft: '1em !important'
            }
        }))

        const menuAttr = computed(() => ({
            class: {
                ['ui grid fluid vertical menu mt-2']: true
            },
            style: {
                minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined
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
                    refresh()
                },
                onHide: () => {
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

        onMounted(() => {
            initFilter()
        })

        const isSelected = item => {
            if (props.returnType === 'object') {
                return props.value.some(i => i.value === item.value)
            }
            return props.value.includes(item[props.returnType])
        }

        // handle item click, without preventing default event
        function handleItemClick(item) {
            console.log(isSelected(item))
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

        return {
            ...toRefs(state),
            menuAttr,
            buttonAttr,
            listItems,
            initFilter,
            handleItemClick,
            isSelected,
            closeMenu,
            parsePxStyle
        }
    }
}
</script>

<style lang="scss" scoped>
.ui.dropdown.pitcher-filter {
    .sub-menu {
        display: block !important;
        position: relative;
        margin: 0 !important;
        left: 0;
        box-shadow: none !important;
        border: none !important;
        overflow-y: auto;

        .item {
            font-size: 1rem !important;

            label:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
