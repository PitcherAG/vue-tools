<template>
    <!-- Numpad -->
    <div class="numpad-input" :class="[group]" :style="{ display: fluid ? 'block' : 'inline-block' }">
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
import Vue from 'vue'
import { parsePxStyle, validateSize } from './mixins'

export const numpadStore = Vue.observable({ groups: {} })

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
        noAnimation: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const localState = reactive({
            numpadIsVisible: false,
            selfIndex: null,
            groupIndex: null,
            labelLeftSlot: !!ctx.slots.labelLeft,
            labelRightSlot: !!ctx.slots.labelRight,
            localValue: props.value
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
            if (!numpadStore.groups[props.group]) {
                numpadStore.groups[props.group] = []
            }
            localState.groupIndex = Object.keys(numpadStore.groups).indexOf(props.group)
            // save item index in local state
            localState.selfIndex = numpadStore.groups[props.group].length
            localState.selfId = `${props.group}_${numpadStore.groups[props.group].length}`
            // push item to global state
            numpadStore.groups[props.group].push({
                id: localState.selfId,
                input: ctx.refs.input,
                blur: () => focus(false)
            })

            // outer click listener
            document.addEventListener('click', determineOuterClick)
        })

        // destroy
        onUnmounted(() => {
            document.removeEventListener('click', determineOuterClick)
        })

        // Watch props.value
        watch(
            () => props.value,
            val => {
                localState.localValue = val
            }
        )

        // function to emit data if not lazy
        function emit(val) {
            const parsed = typeof localState.localValue === 'number' ? parseFloat(val) : val

            if (!props.lazy) {
                ctx.emit('input', parsed)
            }
        }

        function addVal(val) {
            // before adding a new value, check if next value will pass over the max number
            if (
                props.max &&
                (parseFloat(localState.localValue) >= props.max || parseInt('1' + localState.localValue) >= props.max)
            ) {
                // max number passing on next click, don't add value
                return
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
            if (localState.localValue === '') {
                emit(defaultValue)
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
            const groupArray = Object.keys(numpadStore.groups).map(k => numpadStore.groups[k])
            const allItems = [].concat(...groupArray).filter(i => i.id !== localState.selfId)
            allItems.forEach(i => i.blur())
        }

        function focus(visibility) {
            // blurAll()
            // set visibility
            localState.numpadIsVisible = visibility

            if (visibility) {
                blurOthers()
                checkOverlap()
                // visible, if value empty set default
                if (localState.localValue === '') {
                    emit(defaultValue)
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
            // destruct props
            const { selfIndex } = localState
            const { [props.group]: numpadGroup } = numpadStore.groups

            // check if the component is last in the group
            const isLast = selfIndex === numpadGroup.length - 1

            if (isLast) {
                // jump next group if last
                jumpNextGroup()
                return
            }
            // not last item, jump next in same group
            numpadGroup[selfIndex + 1].input.focus()
        }

        function jumpNextGroup() {
            // destruct
            const { groupIndex } = localState
            // map groups as array
            const groups = Object.keys(numpadStore.groups).map(k => numpadStore.groups[k])
            // if component group is last, go to 0, otherwise next group
            const nextIndex = groupIndex === groups.length - 1 ? 0 : groupIndex + 1
            groups[nextIndex][0].input.focus()
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
            jumpNextGroup
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
