<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />
        <Dropdown clearable searchable class="test" v-model="recordTypeSaved" :items="recordTypes" />
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
                    name: 'Zürich',
                    value: 'zurich',
                    icon: 'cog'
                },
                {
                    name: 'Aargau',
                    value: 'aargau',
                    disabled: true
                },
                {
                    text: 'Ticino',
                    value: 'ticino',
                    image: 'https://fomantic-ui.com/images/avatar/small/jenny.jpg'
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
