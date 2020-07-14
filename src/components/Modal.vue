<template>
    <div class="ui modal" ref="modal" v-bind="modalAttr">
        <!-- Header slot -->
        <div v-if="hasHeaderSlot" class="header">
            <slot name="header" />
        </div>
        <!-- Content/Default slot -->
        <div class="content" v-bind="contentAttr">
            <slot />
        </div>
        <div v-if="hasActionsSlot" class="actions" :class="actionsClass">
            <slot name="actions" />
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './utils'

export default defineComponent({
    props: {
        value: {
            type: Boolean,
            required: true
        },
        basic: Boolean,
        fullscreen: Boolean,
        overlay: Boolean,
        inverted: Boolean,
        long: Boolean,
        scrollingContent: Boolean,
        imageContent: Boolean,
        duration: {
            type: Number,
            default: 400
        },
        align: {
            type: String,
            default: 'center'
        },
        multiple: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        blurring: {
            type: Boolean,
            default: false
        },
        scrollbarWidth: {
            type: Number,
            default: 10
        },
        contentClass: {
            type: String,
            default: ''
        },
        actionsClass: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            validator: val => validateSize(val, 'Modal')
        },
        settings: {
            type: Object,
            default: () => {}
        },
        minWidth: {
            type: [Number, String]
        },
        maxWidth: {
            type: [Number, String],
            default: '100%'
        }
    },
    setup(props, { refs, slots, emit }) {
        const state = reactive({
            hasHeaderSlot: !!slots.header,
            hasActionsSlot: !!slots.actions
        })

        const modalAttr = computed(() => ({
            class: {
                basic: props.basic,
                overlay: props.overlay,
                fullscreen: props.fullscreen,
                inverted: props.inverted,
                [props.size]: !!props.size,
                [`${props.align} aligned`]: !!props.align
            },
            style: {
                minWidth: props.minWidth ? parsePxStyle(props.minWidth) : undefined,
                maxWidth: parsePxStyle(props.maxWidth)
            }
        }))

        const contentAttr = computed(() => {
            const attrs = {
                class: {
                    scrolling: props.scrollingContent,
                    image: props.imageContent
                }
            }
            props.contentClass.split(' ').forEach(v => {
                attrs.class[v] = true
            })
            return attrs
        })

        const initModal = () => {
            $(refs.modal).modal({
                autofocus: false,
                allowMultiple: props.multiple,
                blurring: props.blurring,
                closable: props.closable,
                duration: props.duration,
                scrollbarWidth: props.scrollbarWidth,
                // merge with settings object
                ...props.settings,
                onHide: () => {
                    emit('input', false)
                    emit('onClosed')
                },
                onHidden: () => emit('onHidden'),
                onShow: () => emit('onShow'),
                onVisible: () => emit('onVisible')
            })
        }

        onMounted(() => {
            initModal()

            if (props.value) {
                $(refs.modal).modal('show')
            }
        })

        watch(
            () => props.value,
            newVal => {
                if (newVal) {
                    $(refs.modal).modal('show')
                    return
                }
                $(refs.modal).modal('hide')
            }
        )

        // execute command with jquery on fomantic
        function exec(comm) {
            return $(refs.modal).progress(comm)
        }

        return { ...toRefs(state), modalAttr, contentAttr, exec }
    }
})
</script>
<style lang="scss" scoped>
// @import '@/styles/mixins.scss';

// @include polyfillIE {
//     .ui.fullscreen.modal .header {
//         margin-top: 16px !important;
//     }
// }
// .actions.left {
//     text-align: left !important;
// }
</style>
