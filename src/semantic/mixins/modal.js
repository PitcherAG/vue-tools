const changedEvent = 'changed'

export default {
    model: {
        prop: 'open',
        event: changedEvent
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    events: {
        [changedEvent]: {
            custom: true
        }
    },
    watch: {
        open(value) {
            if (value) {
                this.showModal()
            } else {
                this.hideModal()
            }
        }
    },
    methods: {
        hideModal() {
            $(this.$el).modal('hide')
        },
        onApprove() {
            this.$emit('approve')
        },
        onDeny() {
            this.$emit('deny')
        },
        onHidden() {
            this.$emit('hidden')
            this.$emit('changed', false)
        },
        onHide() {
            this.$emit('hide')
        },
        onShow() {
            this.$emit('show')
        },
        onVisible() {
            this.$emit('visible')
        },
        showModal() {
            $(this.$el).modal('show')
        }
    },
    mounted() {
        $(this.$refs.modal).modal({
            ...this.modalOptions,
            onApprove: this.onApprove,
            onDeny: this.onDeny,
            onHidden: this.onHidden,
            onHide: this.onHide,
            onShow: this.onShow,
            onVisible: this.onVisible
        })
    }
}
