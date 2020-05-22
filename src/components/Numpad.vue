<template>
    <!-- Numpad -->
    <div
        class="numpad-input"
        :class="[group]"
        :style="{ display: fluid ? 'block' : 'inline-block' }"
        @focus="focus(true)"
    >
        <!-- Input -->
        <div class="ui" :class="inputClasses">
            <i v-if="leftIcon" class="icon" :class="leftIcon" style="z-index: 1" />
            <slot v-if="labelLeftSlot" name="labelLeft" />
            <input
                :value="value"
                type="text"
                ref="input"
                @focus="focus(true)"
                @blur="focus(true)"
                @keypress="keypress"
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
                    <button class="keys__row--number" @mousedown.prevent @click="emit('00.0')">
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
import { defineComponent, reactive, toRefs, computed, onMounted } from '@vue/composition-api'

// Global store for numpad component
const useNumpadStore = createStore({
    id: 'numpad',
    state: () => ({ groups: {} })
})

export default defineComponent({
    props: {
        value: {
            type: String
        },
        group: {
            type: String,
            default: 'no-group'
        },
        fluid: Boolean,
        disabled: Boolean,
        color: String,
        size: String,
        rightIcon: String,
        leftIcon: String,
        max: {
            type: Number,
            default: 1000000.0
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

        const inputClasses = computed(() => {
            return {
                fluid: props.fluid,
                disabled: props.disabled,
                [props.color]: !!props.color,
                [props.size]: !!props.size,
                left: props.leftIcon,
                right: ctx.slots.labelRight,
                labeled: ctx.slots.labelLeft || ctx.slots.labelRight,
                icon: props.rightIcon || props.leftIcon,
                input: true
            }
        })

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
        })

        function emit(val) {
            ctx.emit('input', val)
        }

        function addVal(val) {
            // before adding a new value, check if next value will pass over the max number
            if (parseFloat(props.value) >= props.max || parseInt('1' + props.value) >= props.max) {
                // max number passing on next click, don't add value
                return
            }

            // value does not contain .
            if (props.value.indexOf('.') === -1) {
                emit(props.value + val)
                return
            }

            // value contains . create fraction
            const fraction = props.value.split('.')

            if (fraction[0] === '00' && fraction[1] === '0') {
                // fresh start
                emit(`${fraction[0]}.${val}`)
            } else if (fraction[0] === '00' && fraction[1] !== '0') {
                // remove last char in F0 + add F1 + . + newValue
                emit(`${fraction[0].slice(0, -1)}${fraction[1]}.${val}`)
            } else if (fraction[0].charAt(0) === '0') {
                // remove first char in F0 + add F1 + . + newValue
                emit(`${fraction[0].substr(1)}${fraction[1]}.${val}`)
            } else {
                // F0 + F1 + . + newValue
                emit(`${fraction[0]}${fraction[1]}.${val}`)
            }
        }

        function incDec(action) {
            if (props.value === '') {
                emit('00.0')
            }
            // parse the number with decimals
            let parsedNumber = parseFloat(props.value).toFixed(2)

            if (action === 'dec' && parsedNumber >= 1) {
                // decrease action
                parsedNumber--
                emit(parsedNumber.toFixed(1).toString())
            } else if (action === 'inc' && parseFloat(props.value) < props.max) {
                // increase action
                parsedNumber++
                parsedNumber = parsedNumber > props.max ? props.max : parsedNumber
                emit(parsedNumber.toFixed(1).toString())
            }
        }

        function backspace() {
            // if value does not contain .
            if (props.value.indexOf('.') === -1) {
                // if next click will NOT clear the input
                if (props.value.slice(0, -1) !== '') {
                    emit(props.value.slice(0, -1))
                } else {
                    // next click will clear the input, set default
                    emit('00.0')
                }
                return
            }

            // value contains . split fraction to handle it
            const fraction = props.value.split('.')
            // get last char in fraction 0, last number before the .
            const lastChar = fraction[0].charAt(fraction[0].length - 1)

            if (fraction[0].length > 2) {
                // fraction 0 has more than 2 digits
                emit(`${fraction[0].slice(0, -1)}.${lastChar}`)
            } else if (fraction[0].length === 2) {
                // fraction 0 has exactly 2 digits
                emit(`0${fraction[0].slice(0, -1)}.${lastChar}`)
            } else if (fraction[0].length === 1) {
                // fraction 0 has 1 digit
                emit(`00.${lastChar}`)
            }
        }

        function focus(visibility) {
            // set visibility
            localState.numpadIsVisible = visibility

            if (visibility) {
                checkOverlap()
                // visible, if value empty set default
                if (props.value === '') {
                    emit('00.0')
                }
                // select the value inside input
                ctx.refs.input.select()

                if (props.noAnimation) {
                    return
                }

                // if animation is active, animate
                ctx.refs.input.classList.add('animate')
                setTimeout(() => ctx.refs.input.classList.remove('animate'), 300)
            }
        }

        function keypress(e) {
            ctx.root.$nextTick(() => {
                if (props.value.indexOf('.') === -1 && e.target.value.length > 5) {
                    // if value not contains . and length is over 5
                    return e.preventDefault()
                } else if (props.value.indexOf('.') !== -1 && e.target.value.length > 7) {
                    // if value contains . and length is over 7
                    return e.preventDefault()
                } else if (!/\d/.test(e.key) && e.key !== '.') {
                    // if value is not digit and pressed key is not .
                    return e.preventDefault()
                } else if (!/\d/.test(e.key) && e.target.value.includes('.')) {
                    // if value is not digit and value includes .
                    return e.preventDefault()
                }
                // must be emitted in the end of event loop
                setTimeout(() => {
                    emit(e.target.value)
                })
            })
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
            inputClasses,
            addVal,
            incDec,
            backspace,
            focus,
            keypress,
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
    input {
        text-align: right;
        transform: scale(1) translateY(0) translateZ(0);
        &.animate {
            @extend .pulse;
        }
    }

    .numpad {
        display: inline-flex;
        border-radius: $border-radius;
        background-color: $numpad-bg;
        position: fixed;
        z-index: 5;
        top: auto;
        left: auto;
        right: 16px;
        bottom: 16px;

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

                    &:not(:last-child) {
                        border-right: $border;
                    }

                    &:hover {
                        color: rgba(0, 0, 0, 0.3);
                    }
                }
            }
        }

        .thinner {
            -webkit-text-stroke: 3px $numpad-bg;

            // Polyfill for IE
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
