<template>
    <div class="pt-4 fill-height">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <ModalEx />
        <!-- <NumpadInputEx /> -->
        <!-- <DataTableEx /> -->
        <!-- <DropdownEx /> -->
        <!-- <ProgressBarEx /> -->
    </div>
</template>

<script>
import DataTableEx from './examples/DataTable.example.vue'
import DropdownEx from './examples/Dropdown.example.vue'
import ModalEx from './examples/Modal.example.vue'
import NumpadInputEx from './examples/NumpadInput.example.vue'
import ProgressBarEx from './examples/ProgressBar.example.vue'

export default {
    components: {
        DataTableEx,
        DropdownEx,
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
