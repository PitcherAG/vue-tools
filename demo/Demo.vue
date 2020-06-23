<template>
    <div class="pt-4 fill-height">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <NumpadInputEx />
        <DataTableEx />
    </div>
</template>

<script>
import NumpadInputEx from './examples/NumpadInput.example.vue'
import DataTableEx from './examples/DataTable.example.vue'

export default {
    components: {
        NumpadInputEx,
        DataTableEx
    },
    setup() {}
}
</script>

<style lang="scss">
//
</style>
