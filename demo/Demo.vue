<template>
    <div class="pt-4 fill-height">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <NumpadInputEx />
        <!-- <DataTableEx /> -->
        <!-- <DropdownEx /> -->
        <!-- <ProgressBarEx /> -->
    </div>
</template>

<script>
import NumpadInputEx from './examples/NumpadInput.example.vue'
import DataTableEx from './examples/DataTable.example.vue'
import DropdownEx from './examples/Dropdown.example.vue'
import ProgressBarEx from './examples/ProgressBar.example.vue'

export default {
    components: {
        NumpadInputEx,
        DataTableEx,
        DropdownEx,
        ProgressBarEx
    },
    setup() {}
}
</script>

<style lang="scss">
//
</style>
