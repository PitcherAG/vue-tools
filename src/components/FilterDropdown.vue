<template>
    <div class="ui dropdown pitcher-filter" ref="filter">
        <button class="ui right labeled icon button">
            <i class="chevron down icon" />
            <span>{{ titleTest }}</span>
        </button>
        <div v-bind="menuAttr">
            <div class="h-container d-flex align-items-center pa-3">
                <h3 class="ui header ma-0">
                    {{ titleTest }}
                    <div class="ui grey circular label">2</div>
                </h3>
                <!-- Close button -->
                <i class="times icon thin ml-auto" style="cursor: pointer; font-size: 1.1em" @click="hideMenu" />
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
                    <i class="times thin icon" @click="" />
                </div>
            </div>
            <div class="item" @click.stop>
                <div class="ui checkbox">
                    <input type="checkbox" name="example" />
                    <label>Zurich</label>
                </div>
            </div>
            <div class="item" @click.stop>
                <div class="ui checkbox">
                    <input type="checkbox" name="example" />
                    <label>Winterthur</label>
                </div>
            </div>
            <div class="item" @click.stop>
                <div class="ui checkbox">
                    <input type="checkbox" name="example" />
                    <label>Bern</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, reactive, toRefs, onMounted, watchEffect } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'

export default {
    props: {
        value: {
            // required: true
        },
        items: {
            type: Array,
            required: false
        },
        minWidth: {
            type: [String, Number],
            default: 300
        }
    },

    setup(props, { refs, emit, slots }) {

        // local state
        const state = reactive({
            titleTest: 'Filter menu',
            check: false,
            searchIsVisible: false,
            isSearching: false,
            isSingleItem: false,
            hasCustomIcon: props.icon !== 'dropdown',
            hasDefaultSlot: !!slots.default
        })

        const menuAttr = computed(() => ({
            class: {
                ['ui grid fluid vertical menu mt-2']: true
            },
            style: {
                minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined
            }
        }))

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

        const hideMenu = () => {
            $(refs.filter).dropdown('hide')
        }

        onMounted(() => {
            initFilter()
        })

        // handle item click, without preventing default event
        function handleItemClick(item) {
            if (props.searchable && props.value === item.value) {
                refs.search.value = ''
                state.isSearching = false
            }
        }

        return {
            ...toRefs(state),
            // dropdownAttr,
            menuAttr,
            initFilter,
            handleItemClick,
            hideMenu
        }
    }
}
</script>

<style lang="scss" scoped>
.ui.dropdown.pitcher-filter {
    // // default text color
    // .default {
    //     color: rgba(191, 191, 191, 0.87) !important;
    //     display: inline-block;
    //     pointer-events: none;
    // }

    // &.multiple.search {
    //     .default {
    //         position: absolute;
    //         left: 8px;
    //     }
    // }

    // // image in list
    // .item img {
    //     vertical-align: top;
    //     width: auto;
    //     margin: -0.5em 0.5em -0.5em 0;
    //     max-height: 2em;
    // }

    // &.not-selection:not(.labeled) {
    //     // any icon other than .dropdown
    //     & > .icon:not(.dropdown) {
    //         margin-left: 8px;
    //         margin-right: 0;
    //     }

    //     // when it is not a selection list
    //     & > .icon.dropdown {
    //         margin: 0 0.2em 0 1em;
    //     }
    // }

    // &.multiple {
    //     .default {
    //         padding-top: 8px;
    //         padding-left: 8px;
    //     }
    // }
}
</style>
