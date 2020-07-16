<template>
    <div class="ui modal" ref="modal" v-bind="modalAttr">
        <!-- If has custom slot to replace whole content -->
        <template v-if="hasCustomSlot">
            <slot name="custom" />
        </template>
        <!-- Default content -->
        <template v-else>
            <!-- Has header slot -->
            <div v-if="hasHeaderSlot" class="header">
                <slot name="header" />
            </div>
            <!-- Header with title prop / default -->
            <div v-else-if="title" class="header d-flex">
                <i v-if="titleIcon" :class="`${titleIcon} icon`" />
                {{ title }}
                <i
                    v-if="!hideCloseIcon"
                    class="times icon ml-auto mr-0"
                    style="cursor: pointer"
                    @click="emit('input', false)"
                />
            </div>

            <!-- Content/Default slot -->
            <div class="content" :class="contentAttr">
                <slot />
            </div>

            <!-- Actions slot -->
            <div v-if="hasActionsSlot" class="actions">
                <slot name="actions" />
            </div>
            <div v-else-if="approveText || denyText" class="actions">
                <button v-if="denyText" class="ui button" :class="denyClass" @click="emit('onDeny')">
                    {{ denyText }}
                </button>
                <button v-if="approveText" class="ui button" :class="approveClass" @click="emit('onApprove')">
                    {{ approveText }}
                </button>
            </div>
        </template>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from '@vue/composition-api'
import { parsePxStyle, validateSize } from './mixins'

export default defineComponent({
    props: {
        value: {
            type: Boolean,
            required: true
        },
        title: String,
        titleIcon: String,
        approveText: String,
        denyText: String,
        hideCloseIcon: {
            type: Boolean,
            default: false
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
        approveClass: {
            type: String,
            default: 'positive'
        },
        denyClass: {
            type: String,
            default: 'negative'
        },
        size: {
            type: String,
            validator: val => validateSize(val, 'Modal.vue')
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
            hasActionsSlot: !!slots.actions,
            hasCustomSlot: !!slots.custom
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
            const cls = {
                scrolling: props.scrollingContent,
                image: props.imageContent
            }
            props.contentClass.split(' ').forEach(v => {
                cls[v] = true
            })
            return cls
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

        return { ...toRefs(state), modalAttr, contentAttr, exec, emit }
    }
})
</script>
