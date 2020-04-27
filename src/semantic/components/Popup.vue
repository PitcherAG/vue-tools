<template>
    <div>
        <slot ref="trigger"/>
        <div class="ui popup" ref="popup">
            <slot name="content"/>
        </div>
    </div>
</template>
<script>
    import {onBeforeUnmount, onMounted} from "@vue/composition-api";

    export default {
        name: "Popup",
        props: {
            on: String,
            position: String
        },
        setup(props, {refs}) {
            onMounted(() => {
                $(refs.trigger).popup({
                    on: props.on,
                    position: 'bottom left'
                })
                popup: refs.popup,
            })

            onBeforeUnmount(() => {
                $(refs.trigger).popup('destroy')
            })
        }
    }
</script>

<style scoped>
</style>