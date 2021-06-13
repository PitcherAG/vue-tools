<template>
  <div ref="dropdown" class="ui dropdown pitcher-dropdown" v-bind="dropdownAttr" @click="toggleDropdown">
    <template v-if="hasDefaultSlot">
      <slot />
    </template>
    <template v-else>
      <!-- hidden value -->
      <input type="hidden" :value="value" />

      <!-- icon / if selection -->
      <i
        v-show="(selection && !isSearching) || (selection && multiple)"
        :class="[`${icon} icon`, { 'mr-2': hasCustomIcon, 'ml-1 mt-2': multiple }]"
      />

      <!-- labels -->
      <template v-if="multiple">
        <a
          v-show="value.includes(item.value)"
          v-for="item in filteredItems"
          :key="item.value"
          class="ui label"
          :data-value="item.value"
        >
          {{ item.text }}
          <i class="delete icon" @click="removeItem($event, item.value)" />
        </a>
      </template>

      <!-- search input -->
      <input
        v-show="isSearchable"
        ref="search"
        class="search"
        autocomplete="off"
        tabindex="0"
        @input="onSearch"
        @blur="handleSearchBlur"
      />

      <!-- selected text -->
      <div v-show="value && !multiple && !isSearching" class="custom-text">
        {{ selectedItemText }}
      </div>

      <!-- placeholder -->
      <div v-show="!value && !isSearching" class="default" :style="{ left: hasCustomIcon ? '32px' : '' }">
        {{ defaultText }}
      </div>

      <!-- icon / if NOT selection -->
      <i v-if="!selection" :class="`${icon} icon mr-2`" />

      <!-- clear button -->
      <i
        v-if="clearBtnAttr.render"
        ref="clearButton"
        :class="clearBtnAttr.class"
        :style="clearBtnAttr.style"
        @click="clear"
      />

      <!-- menu items -->
      <div class="menu">
        <div
          v-for="item in listItems"
          :key="item.uuid"
          :data-value="item.value"
          :data-text="item.text"
          :class="[item.type, { disabled: item.disabled, 'active filtered': value && value.includes(item.value) }]"
        >
          <img v-if="item.image" :src="item.image" class="image" />
          <i v-if="item.icon" :class="`${item.icon} icon`" />
          {{ item.text }}
          <div v-if="item.description" class="description">{{ item.description }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types, vue/no-unused-properties */
import { computed, onMounted, reactive, toRefs } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'
import { uid } from '../utils/uid'

export default {
  name: 'Dropdown',
  props: {
    value: {
      required: true,
    },
    items: {
      type: Array,
      required: false,
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    icon: {
      type: String,
      default: 'dropdown',
    },
    defaultText: {
      type: String,
      default: () => $gettext('Select'),
    },
    action: {
      type: String,
      default: 'activate',
    },
    settings: Object,
    fluid: Boolean,
    compact: Boolean,
    selection: {
      type: Boolean,
      default: true,
    },
    multiple: Boolean,
    searchable: Boolean,
    minSearchItems: {
      type: Number,
      default: 20,
    },
    fullTextSearch: {
      type: Boolean,
      default: false,
    },
    clearable: Boolean,
    disabled: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
    error: Boolean,
    color: String,
    minWidth: {
      type: [Number, String],
    },
    maxWidth: {
      type: [Number, String],
      default: '100%',
    },
    size: {
      type: String,
      validator: (val) => validateSize(val, 'Dropdown.vue'),
    },
  },
  emits: ['input', 'onSelected'],

  setup(props, { refs, emit, slots }) {
    // validate
    if (!props.selection && isSearchable.value) {
      console.error(`Combining searchable = true with selection = false is not recommended!`)
    }

    // local state
    const state = reactive({
      isSearching: false,
      isSingleItem: false,
      hasCustomIcon: props.icon !== 'dropdown',
      hasDefaultSlot: !!slots.default,
    })

    const dropdownAttr = computed(() => ({
      class: {
        fluid: props.fluid,
        compact: props.compact,
        search: isSearchable.value,
        // false by default if default slot is used
        selection: state.hasDefaultSlot ? false : props.selection,
        'not-selection': !props.selection,
        multiple: props.multiple,
        loading: props.loading,
        disabled: props.disabled || props.loading,
        error: props.error,
        [props.color]: !!props.color,
        [props.size]: !!props.size,
      },
      style: {
        minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
        maxWidth: parsePxStyle(props.maxWidth),
      },
    }))

    const selectedItemText = computed(() => {
      if (!props.multiple) {
        const found = listItems.value.find((i) => i.value === props.value)

        return found ? found.text : ''
      }

      return ''
    })

    const clearBtnAttr = computed(() => {
      const attr = {
        render:
          // statements for v-if
          (props.selection && props.clearable && props.value && !state.isSearching) ||
          (props.selection && props.clearable && props.multiple && props.value) ||
          (!props.selection && !props.multiple && props.clearable && props.value),
        class: 'remove icon',
        style: {
          zIndex: '100',
          display: 'inline-block',
          right: state.hasCustomIcon || state.isSearching ? '1.5em' : undefined,
        },
      }

      if (!props.selection && !props.multiple && props.clearable && props.value) {
        attr.style.right = '-10px'
        attr.style.top = '-2px'
      }

      return attr
    })

    // transform list items for dropdown
    const listItems = computed(() => {
      if (!props.items) {
        return []
      }

      return props.items.map((item) => {
        if (item.constructor === Object) {
          return {
            text: item[props.itemText],
            value: item[props.itemValue],
            type: item.type ? item.type : 'item',
            description: item.description,
            icon: item.icon,
            image: item.image,
            disabled: item.disabled,
            uuid: uid(2),
          }
        } else {
          // if not key/value pair
          state.isSingleItem = true

          return {
            text: item,
            value: item,
            type: 'item',
            uuid: uid(2),
          }
        }
      })
    })

    const filteredItems = computed(() => listItems.value.filter((i) => i.type === 'item'))

    const isSearchable = computed(() => props.searchable || props.items.length > props.minSearchItems)

    // fomantic dropdown initialization
    const initDropdown = () => {
      const settings = $.extend(
        {
          action: props.action,
          fullTextSearch: props.fullTextSearch,
          onChange: (value) => {
            if (isSearchable.value) {
              state.isSearching = false

              if (props.multiple) {
                refs.search.click()
              }
            }

            // emit full object onChange as onSelected event
            let returnValue = []

            if (props.multiple || refs.dropdown.className.includes('multiple')) {
              const split = value.split(',')

              // usage with items
              if (props.items) {
                returnValue = props.items.filter((item) => {
                  const findItem = state.isSingleItem ? item : item[props.itemValue]

                  if (split.includes(findItem)) {
                    return item
                  }

                  return undefined
                })
              }
            } else {
              // usage with items
              // eslint-disable-next-line no-lonely-if
              if (props.items) {
                returnValue = state.isSingleItem ? value : props.items.find((item) => item[props.itemValue] === value)
              }
            }
            emit('input', value)
            emit('onSelected', returnValue)
          },
        },
        // additional settings for dropdown
        props.settings
      )

      // initialize
      $(refs.dropdown).dropdown(settings)
    }

    // function to run onSearch
    const onSearch = () => {
      state.isSearching = refs.search && !!refs.search.value
    }

    const removeItem = (event, value) => {
      event.preventDefault()
      event.stopPropagation()

      let valueArray = props.value.split(',')

      valueArray = valueArray.filter((v) => v !== value)

      emit('input', valueArray.join(','))
      emit('onSelected', valueArray)
    }

    // function to clear
    const clear = (event) => {
      event.preventDefault()
      event.stopPropagation()
      emit('input', '')
      emit('onSelected', [])
    }

    function handleSearchBlur() {
      refs.search.value = ''
      state.isSearching = false
    }

    function toggleDropdown(event) {
      // if not searchable & clicked target is the container, not item
      if (!isSearchable.value && event.target.className.includes('pitcher-dropdown')) {
        $(refs.dropdown).dropdown('toggle')
      }
    }

    // Gives ability to execute commands on dropdown from parent
    function exec(comm, arg) {
      if (!arg) {
        return $(refs.dropdown).dropdown(comm)
      }

      return $(refs.dropdown).dropdown(comm, arg)
    }

    onMounted(() => {
      initDropdown()
    })

    return {
      ...toRefs(state),
      isSearchable,
      dropdownAttr,
      listItems,
      filteredItems,
      selectedItemText,
      clearBtnAttr,
      initDropdown,
      onSearch,
      removeItem,
      clear,
      handleSearchBlur,
      toggleDropdown,
      exec,
    }
  },
}
</script>

<style lang="scss" scoped>
.ui.dropdown.pitcher-dropdown {
  // default text color
  .default {
    color: rgba(191, 191, 191, 0.87) !important;
    display: inline-block;
    pointer-events: none;
  }

  &.multiple.search {
    .default {
      position: absolute;
      left: 8px;
    }
  }

  .custom-text {
    display: inline-block;
    pointer-events: none;
  }

  // image in list
  .item img {
    vertical-align: top;
    width: auto;
    margin: -0.5em 0.5em -0.5em 0;
    max-height: 2em;
  }

  &.not-selection:not(.labeled) {
    // any icon other than .dropdown
    & > .icon:not(.dropdown) {
      margin-left: 8px;
      margin-right: 0;
    }

    // when it is not a selection list
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
