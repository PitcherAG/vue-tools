<template>
    <div class="pt-4 fill-height">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <!-- <ModalEx /> -->
        <!-- <NumpadInputEx /> -->
        <DataTableEx />
        <!-- <DropdownEx /> -->
        <!-- <FilterEx /> -->
        <!-- <ProgressBarEx /> -->
    </div>
</template>

<script>
import DataTableEx from './examples/DataTable.example.vue'
import DropdownEx from './examples/Dropdown.example.vue'
import FilterEx from './examples/FilterDropdown.example.vue'
import ModalEx from './examples/Modal.example.vue'
import NumpadInputEx from './examples/NumpadInput.example.vue'
import ProgressBarEx from './examples/ProgressBar.example.vue'

export default {
    components: {
        DataTableEx,
        DropdownEx,
        FilterEx,
        ModalEx,
        NumpadInputEx,
        ProgressBarEx
    },
    setup() {}
}
</script>

<style lang="scss">
//
</style>
