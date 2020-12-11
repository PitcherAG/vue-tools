<template>
  <!-- Numpad -->
  <div class="numpad-input" :class="[group]" :data-group="group" :style="{ display: fluid ? 'block' : 'inline-block' }">
    <!-- Input -->
    <div ref="inputDiv" class="ui" :class="inputAttrs.class">
      <i v-if="leftIcon" class="icon" :class="leftIcon" style="z-index: 1" />
      <slot v-if="labelLeftSlot" name="labelLeft" />
      <input
        ref="input"
        :value="localValue"
        type="text"
        readonly="readonly"
        class="number-input"
        :style="inputAttrs.style"
        :placeholder="placeholder"
        @focus="focus(true)"
        @blur="focus(false)"
        @keypress.prevent
        @keydown.prevent="handleKeydown"
        @touchstart.stop
      />
      <i v-if="rightIcon" class="icon" :class="rightIcon" />
      <slot v-if="labelRightSlot" name="labelRight" />
    </div>
    <!-- Numpad -->
    <div v-if="numpadIsVisible" ref="numpad" class="ui segment pa-0 mt-0 numpad">
      <div class="numpad__keys">
        <div class="numpad__keys--row">
          <button class="row--number" @mousedown.prevent @click="addVal(1)">
            1
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(2)">
            2
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(3)">
            3
          </button>
          <!-- Clear -->
          <button class="row--number" @mousedown.prevent @click="reset">
            <i class="times icon thinner" />
          </button>
        </div>
        <div class="numpad__keys--row">
          <button class="row--number" @mousedown.prevent @click="addVal(4)">
            4
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(5)">
            5
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(6)">
            6
          </button>
          <!-- Backspace -->
          <button class="row--number" @mousedown.prevent @click="backspace">
            <i class="backspace thin icon" />
          </button>
        </div>
        <div class="numpad__keys--row">
          <button class="row--number" @mousedown.prevent @click="addVal(7)">
            7
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(8)">
            8
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(9)">
            9
          </button>
          <!-- Next in group -->
          <button class="row--number" @mousedown.prevent @click="jumpNextSibling">
            <i class="chevron right thin icon" />
          </button>
        </div>
        <div class="numpad__keys--row">
          <!-- Plus -->
          <button class="row--number" @mousedown.prevent @click="incDec('inc')">
            <i class="plus icon thinner" />
          </button>
          <button class="row--number" @mousedown.prevent @click="addVal(0)">
            0
          </button>
          <!-- Minus -->
          <button class="row--number" @mousedown.prevent @click="incDec('dec')">
            <i class="minus icon thinner" />
          </button>
          <!-- Next group -->
          <button class="row--number" @mousedown.prevent @click="jumpNextGroup">
            <i class="chevron down thin icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, watch, onMounted, onUnmounted } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'

export default defineComponent({
  props: {
    value: {
      type: [String, Number]
    },
    lazy: Boolean,
    decimals: {
      type: Number,
      default: 2,
      validator: val => {
        if (val > 5) {
          console.error("[Vue warn]: The value of decimals can't be higher than 10!")
          return false
        } else if (val < 0) {
          console.error("[Vue warn]: The value of decimals can't be lower than 0!")
          return false
        }
        return true
      }
    },
    group: {
      type: String,
      default: 'no-group'
    },
    resetBefore: {
      type: Boolean,
      default: true
    },
    fluid: Boolean,
    disabled: Boolean,
    transparent: Boolean,
    color: String,
    minWidth: {
      type: [Number, String],
      default: 50
    },
    maxWidth: {
      type: [Number, String],
      default: '100%'
    },
    size: {
      type: String,
      validator: val => validateSize(val, 'NumpadInput.vue')
    },
    rightIcon: String,
    leftIcon: String,
    placeholder: {
      type: String,
      default: ''
    },
    max: {
      type: Number
    },
    disableKeyboard: {
      type: Boolean,
      default: false
    },
    noAnimation: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  setup(props, ctx) {
    const localState = reactive({
      numpadIsVisible: false,
      labelLeftSlot: !!ctx.slots.labelLeft,
      labelRightSlot: !!ctx.slots.labelRight,
      localValue: props.value,
      shouldReset: false
    })

    const inputAttrs = computed(() => {
      return {
        class: {
          fluid: props.fluid,
          disabled: props.disabled,
          [props.color]: !!props.color,
          [props.size]: !!props.size,
          left: props.leftIcon,
          right: ctx.slots.labelRight,
          labeled: ctx.slots.labelLeft || ctx.slots.labelRight,
          icon: props.rightIcon || props.leftIcon,
          transparent: props.transparent,
          input: true
        },
        style: {
          minWidth: parsePxStyle(props.minWidth),
          maxWidth: parsePxStyle(props.maxWidth)
        }
      }
    })

    // set divider value connected to decimals
    // 10, 100, 1000 etc.
    const dividerValue = parseInt('1' + '0'.repeat(props.decimals))
    // default zero value
    const defaultValue = props.decimals === 0 ? '0' : `0.${'0'.repeat(props.decimals)}`

    function addVal(val) {
      // before adding a new value, check if next value will pass over the max number
      if (
        props.max &&
        (parseFloat(localState.localValue) >= props.max || parseInt('1' + localState.localValue) >= props.max)
      ) {
        // max number passing on next click, don't add value
        return
      }

      // if current value is higher than 0, reset value to 0 before first input
      if (localState.shouldReset) {
        emit(defaultValue)
        localState.localValue = defaultValue
        localState.shouldReset = false
      }

      // parse current value as Integer
      const parsed = parseInt(localState.localValue.toString().replace(/\D/g, ''))
      // concatenate incoming value as string with parsed value
      const value = parsed + val.toString()
      // mask the value with decimals
      const masked = (value / dividerValue).toFixed(props.decimals)
      // set value
      emit(masked)
    }

    function incDec(action) {
      if (!localState.localValue) {
        emit(defaultValue)
      }

      // should not reset if only increase/decrease will be clicked
      if (localState.shouldReset) {
        localState.shouldReset = false
      }

      // parse the number with decimals
      let parsedNumber = parseFloat(localState.localValue).toFixed(props.decimals)

      if (action === 'dec' && parsedNumber >= 1) {
        // decrease action
        parsedNumber--
        emit(parsedNumber.toFixed(props.decimals))
      } else if (action === 'inc') {
        // increase action
        parsedNumber++
        if (props.max && parseFloat(localState.localValue) + 1 >= props.max) {
          parsedNumber = props.max
        }
        emit(parsedNumber.toFixed(props.decimals))
      }
    }

    function backspace() {
      // parse current value as Integer & convert to string
      const parsed = parseInt(localState.localValue.toString().replace(/\D/g, '')).toString()
      // remove last char
      const value = parsed.slice(0, -1)
      // mask the value with decimals
      const masked = value / dividerValue

      if (masked > 0) {
        // emit value as fixed
        emit(masked.toFixed(props.decimals))
      } else {
        // set default value as it is now 0
        emit(defaultValue)
      }
    }

    function reset() {
      emit(defaultValue)
    }

    function blurOthers() {
      // get groups in view
      const groups = getNumpadGroups()
      // convert object model to array
      const groupsArray = Object.keys(groups).map(k => groups[k])
      // get all items except self
      const allItems = [].concat(...groupsArray).filter(i => i.input !== ctx.refs.input)
      // remove focus from all the other items
      allItems.forEach(i => i.input.blur())
    }

    function focus(visibility) {
      // set visibility
      localState.numpadIsVisible = visibility

      if (visibility) {
        blurOthers()
        checkOverlap()

        // visible, if value empty set default
        if (!localState.localValue) {
          emit(defaultValue)
        }

        if (props.resetBefore && parseFloat(localState.localValue) > 0) {
          localState.shouldReset = true
        }

        if (props.noAnimation) {
          return
        }

        // if animation is active, animate
        ctx.refs.inputDiv.classList.add('animate')
        setTimeout(() => ctx.refs.inputDiv && ctx.refs.inputDiv.classList.remove('animate'), 300)
      }

      // if blur & lazy model is active
      if (!visibility && props.lazy) {
        ctx.emit('input', localState.localValue)
      }
    }

    function jumpNextSibling() {
      // get current group from the groups in view
      const { [props.group]: group } = getNumpadGroups()
      // find input element in this component and destruct selfIndex
      const { index: selfIndex } = group.find(i => i.input === ctx.refs.input)

      const isLast = selfIndex === group.length - 1
      if (isLast) {
        // jump next group if this is the last one
        jumpNextGroup()
        return
      }

      // not last item, jump next in same group
      group[selfIndex + 1].input.focus()
    }

    function jumpNextGroup() {
      // get groups in view
      const groups = getNumpadGroups()
      // convert object model to array
      const groupsArray = Object.keys(groups).map(k => groups[k])
      // get group index of this component
      const groupIndex = Object.keys(groups).indexOf(props.group)
      // get next group index
      const nextIndex = groupIndex === groupsArray.length - 1 ? 0 : groupIndex + 1

      groupsArray[nextIndex][0].input.focus()
    }

    function handleKeydown(event) {
      event.preventDefault()
      const keyCode = event.keyCode ? event.keyCode : event.which

      if (props.disableKeyboard) {
        return
      } else if (keyCode === 8) {
        // backspace
        backspace()
      } else if (keyCode === 9) {
        // tab
        jumpNextSibling()
      } else if (/\d/.test(event.key)) {
        // numbers
        addVal(parseInt(event.key))
      }
      return
    }

    // function to emit data if not lazy
    function emit(val) {
      const parsed = typeof localState.localValue === 'number' ? parseFloat(val) : val

      if (!props.lazy) {
        ctx.emit('input', parsed)
      }
    }

    function checkOverlap() {
      ctx.root.$nextTick(() => {
        if (!ctx.refs.input || !ctx.refs.numpad) {
          return
        }
        const inputRect = ctx.refs.input.getBoundingClientRect()
        const numpadRect = ctx.refs.numpad.getBoundingClientRect()

        const isColliding = !(
          inputRect.top + inputRect.height < numpadRect.top ||
          inputRect.top > numpadRect.top + numpadRect.height ||
          inputRect.left + inputRect.width < numpadRect.left ||
          inputRect.left > numpadRect.left + numpadRect.width
        )

        if (isColliding) {
          ctx.refs.numpad.classList.add('top')
        }
      })
    }

    // Get numpads as groups in view
    function getNumpadGroups() {
      const inputsInView = document.querySelectorAll('.numpad-input')
      const groups = {}

      inputsInView.forEach(elem => {
        const groupName = elem.getAttribute('data-group')
        if (!groups[groupName]) {
          groups[groupName] = []
        }

        groups[groupName].push({
          id: `${groupName}_${groups[groupName].length}`,
          index: groups[groupName].length,
          input: elem.querySelector('input')
        })
      })
      return groups
    }

    // to check outer click
    const determineOuterClick = e => {
      // if number input & keys row, do nothing
      if (
        e.target.className.includes('numpad') ||
        e.target.className.includes('number-input') ||
        e.target.className.includes('row--number')
      ) {
        return
      }
      focus(false)
    }

    onMounted(() => {
      // outer click listener
      document.addEventListener('click', determineOuterClick)
    })

    onUnmounted(() => {
      // unregister
      document.removeEventListener('click', determineOuterClick)
    })

    // Watch props.value
    watch(
      () => props.value,
      val => {
        localState.localValue = val
      }
    )

    return {
      ...toRefs(localState),
      inputAttrs,
      addVal,
      incDec,
      backspace,
      reset,
      focus,
      emit,
      jumpNextSibling,
      jumpNextGroup,
      handleKeydown
    }
  }
})
</script>

<style lang="scss" scoped>
$number-w: 65px;
$number-h: $number-w;
$numpad-bg: #fff;
$font-size: 2em;
$border: 1px solid #d3d3d3;
$border-radius: 8.4px;

.numpad-input {
  .ui.input {
    transform: scale(1) translateY(0) translateZ(0);
    &.animate {
      @extend .pulse;
    }

    input {
      text-align: right;

      &:active,
      &:visited {
        border-color: #85b7d9;
      }
    }
  }

  .numpad {
    display: inline-flex;
    border-radius: $border-radius;
    background-color: $numpad-bg;
    position: fixed;
    z-index: 10000;
    top: auto;
    left: auto;
    right: 16px;
    bottom: 16px;
    border: $border;

    &.top {
      bottom: auto;
      top: 16px;
    }

    // default number style
    &__keys {
      &--row {
        &:not(:last-child) {
          border-bottom: $border;
        }

        .row--number {
          width: $number-w;
          height: $number-h;
          padding: 0;
          background: transparent;
          color: rgba(0, 0, 0, 0.6);
          font-size: $font-size;
          line-height: $font-size / 2;
          outline: 0;
          border: none;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;

          &:not(:last-child) {
            border-right: $border;
          }

          &:visited,
          &:focus {
            color: rgba(0, 0, 0, 0.6);
          }

          @media (hover: hover) {
            &:hover {
              color: rgba(0, 0, 0, 0.3);
            }
          }

          i {
            pointer-events: none;
          }
        }
      }
    }

    .thinner {
      -webkit-text-stroke: 3px $numpad-bg;

      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        font-family: thin-icons;
      }
    }
  }

  // animaton
  @keyframes pulse {
    0% {
      transform: scale(1) translateY(0) translateZ(0);
    }
    50% {
      transform: scale(1.04) translateY(-5px) translateZ(0);
    }
    100% {
      transform: scale(1) translateY(0) translateZ(0);
    }
  }

  .pulse {
    animation-name: pulse;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
  }
}
</style>
