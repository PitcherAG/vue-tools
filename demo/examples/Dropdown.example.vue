<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />
        <Dropdown clearable class="amk" v-model="recordTypeSaved" :items="recordTypes" />
        <br />
        <!-- <DropdownOld v-model="recordTypeSavedOld" :items="recordTypes" /> -->
        <br />
        <br />
    </div>
</template>

<script>
import Dropdown from '@/components/DropdownNew'
import DropdownOld from '@/components/Dropdown'
import { reactive, toRefs } from '@vue/composition-api'

export default {
    components: {
        Dropdown,
        DropdownOld
    },
    props: {},
    setup() {
        const state = reactive({
            recordTypeSavedOld: 'zurich',
            recordTypeSaved: 'zurich',
            recordTypes: [
                {
                    text: 'Zürich',
                    value: 'zurich',
                    icon: 'cog'
                },
                {
                    text: 'Aargau',
                    value: 'aargau'
                },
                {
                    text: 'Ticino',
                    value: 'ticino'
                },
                {
                    text: 'Bern',
                    value: 'bern'
                },
                {
                    text: 'Lucerne',
                    value: 'lucerne'
                },
                {
                    text: 'Geneva',
                    value: 'geneva'
                }
            ]
        })

        return { ...toRefs(state) }
    }
}
</script>
