<template>
    <!-- Numpad -->
    <div class="numpad-input" :class="[group]" :style="{ display: fluid ? 'block' : 'inline-block' }">
        <!-- Input -->
        <div class="ui" :class="inputAttrs.class" ref="inputDiv">
            <i v-if="leftIcon" class="icon" :class="leftIcon" style="z-index: 1" />
            <slot v-if="labelLeftSlot" name="labelLeft" />
            <input
                :value="value"
                type="text"
                readonly="readonly"
                class="number-input"
                :style="inputAttrs.style"
                :placeholder="placeholder"
                ref="input"
                @focus="focus(true)"
                @blur="focus(false)"
                @keypress.prevent
            />
            <i v-if="rightIcon" class="icon" :class="rightIcon" />
            <slot v-if="labelRightSlot" name="labelRight" />
        </div>
        <!-- Numpad -->
        <div v-if="numpadIsVisible" class="ui segment pa-0 mt-0 numpad" ref="numpad">
            <div class="keys">
                <div class="keys__row">
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(1)">
                        1
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(2)">
                        2
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(3)">
                        3
                    </button>
                    <!-- Clear -->
                    <button class="keys__row--number" @mousedown.prevent @click="reset">
                        <i class="times icon thinner" />
                    </button>
                </div>
                <div class="keys__row">
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(4)">
                        4
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(5)">
                        5
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(6)">
                        6
                    </button>
                    <!-- Backspace -->
                    <button class="keys__row--number" @mousedown.prevent @click="backspace">
                        <i class="backspace thin icon" />
                    </button>
                </div>
                <div class="keys__row">
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(7)">
                        7
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(8)">
                        8
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(9)">
                        9
                    </button>
                    <!-- Next in group -->
                    <button class="keys__row--number" @mousedown.prevent @click="jumpNextSibling">
                        <i class="chevron right thin icon" />
                    </button>
                </div>
                <div class="keys__row">
                    <!-- Plus -->
                    <button class="keys__row--number" @mousedown.prevent @click="incDec('inc')">
                        <i class="plus icon thinner" />
                    </button>
                    <button class="keys__row--number" @mousedown.prevent @click="addVal(0)">
                        0
                    </button>
                    <!-- Minus -->
                    <button class="keys__row--number" @mousedown.prevent @click="incDec('dec')">
                        <i class="minus icon thinner" />
                    </button>
                    <!-- Next group -->
                    <button class="keys__row--number" @mousedown.prevent @click="jumpNextGroup">
                        <i class="chevron down thin icon" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createStore } from 'pinia'
import { defineComponent, reactive, toRefs, computed, onMounted, onUnmounted } from '@vue/composition-api'

// Global store for numpad component
const useNumpadStore = createStore({
    id: 'numpad',
    state: () => ({ groups: {} })
})

const parsePxStyle = val => {
    return val.toString().includes('%') || val.toString().includes('px') ? val : `${parseInt(val)}px`
}

export default defineComponent({
    props: {
        value: {
            type: [String, Number]
        },
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
        const { state } = useNumpadStore()
        const localState = reactive({
            numpadIsVisible: false,
            selfIndex: null,
            groupIndex: null,
            labelLeftSlot: !!ctx.slots.labelLeft,
            labelRightSlot: !!ctx.slots.labelRight
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
            if (!e.target.className.includes('number')) {
                focus(false)
            }
        }

        onMounted(() => {
            if (!state.groups[props.group]) {
                state.groups[props.group] = []
            }
            localState.groupIndex = Object.keys(state.groups).indexOf(props.group)
            // save item index in local state
            localState.selfIndex = state.groups[props.group].length
            // push item to global state
            state.groups[props.group].push({
                id: `${props.group}_${state.groups[props.group].length}`,
                input: ctx.refs.input
            })

            // outer click listener
            document.addEventListener('click', determineOuterClick)
        })

        // destroy
        onUnmounted(() => {
            document.removeEventListener('click', determineOuterClick)
        })

        function emit(val) {
            const parsed = typeof props.value === 'number' ? parseFloat(val) : val
            ctx.emit('input', parsed)
        }

        function addVal(val) {
            // before adding a new value, check if next value will pass over the max number
            if (props.max && (parseFloat(props.value) >= props.max || parseInt('1' + props.value) >= props.max)) {
                // max number passing on next click, don't add value
                return
            }

            // parse current value as Integer
            const parsed = parseInt(props.value.toString().replace(/\D/g, ''))
            // concatenate incoming value as string with parsed value
            const value = parsed + val.toString()
            // mask the value with decimals
            const masked = (value / dividerValue).toFixed(props.decimals)
            // set value
            emit(masked.toString())
        }

        function incDec(action) {
            if (props.value === '') {
                emit(defaultValue)
            }
            // parse the number with decimals
            let parsedNumber = parseFloat(props.value).toFixed(props.decimals)

            if (action === 'dec' && parsedNumber >= 1) {
                // decrease action
                parsedNumber--
                emit(parsedNumber.toFixed(props.decimals).toString())
            } else if (action === 'inc') {
                // increase action
                parsedNumber++
                if (props.max && parseFloat(props.value) + 1 >= props.max) {
                    parsedNumber = props.max
                }
                emit(parsedNumber.toFixed(props.decimals).toString())
            }
        }

        function backspace() {
            // parse current value as Integer & convert to string
            const parsed = parseInt(props.value.toString().replace(/\D/g, '')).toString()
            // remove last char
            const value = parsed.slice(0, -1)
            // mask the value with decimals
            const masked = (value / dividerValue).toFixed(props.decimals)

            if (masked !== 0) {
                // set value
                emit(masked.toString())
            } else {
                // set default value as it is now 0
                emit(defaultValue)
            }
        }

        function reset() {
            emit(defaultValue)
        }

        function focus(visibility) {
            // set visibility
            localState.numpadIsVisible = visibility

            if (visibility) {
                checkOverlap()
                // visible, if value empty set default
                if (props.value === '') {
                    emit(defaultValue)
                }
                if (props.noAnimation) {
                    return
                }

                // if animation is active, animate
                ctx.refs.inputDiv.classList.add('animate')
                setTimeout(() => ctx.refs.inputDiv.classList.remove('animate'), 300)
            }
        }

        function jumpNextSibling() {
            // destruct props
            const { selfIndex } = localState
            const { [props.group]: numpadGroup } = state.groups

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
            const groups = Object.keys(state.groups).map(k => state.groups[k])
            // if component group is last, go to 0, otherwise next group
            const nextIndex = groupIndex === groups.length - 1 ? 0 : groupIndex + 1
            groups[nextIndex][0].input.focus()
        }

        function checkOverlap() {
            ctx.root.$nextTick(() => {
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
        .keys {
            &__row {
                &:not(:last-child) {
                    border-bottom: $border;
                }

                &--number {
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
