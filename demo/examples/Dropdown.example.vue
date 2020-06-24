<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />
        <Dropdown clearable searchable class="test" icon="filter" ref="dropdown" v-model="recordTypeSaved" :items="recordTypes" />
        <br />
        <!-- <DropdownOld v-model="recordTypeSavedOld" :items="recordTypes" /> -->
        <br />
        <br />
        <button @click="test">test me</button>
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
    setup(props, ctx) {
        const state = reactive({
            recordTypeSavedOld: 'zurich',
            recordTypeSaved: '',
            recordTypes: [
                {
                    text: 'Cantons',
                    type: 'header'
                },
                {
                    text: 'Zürich',
                    value: 'zurich',
                    icon: 'cog'
                },
                {
                    text: 'Aargau',
                    value: 'aargau',
                    type: 'item'
                },
                {
                    text: 'Vaud',
                    value: 'vaud',
                    disabled: true
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
                    value: 'lucerne',
                    // image: 'https://fomantic-ui.com/images/avatar/small/jenny.jpg',
                    icon: 'users'
                },
                {
                    text: 'Geneva',
                    value: 'geneva'
                }
            ]
        })

        function test() {
            state.recordTypes[0].icon = 'user'
            state.recordTypes[2].disabled = false
        }

        return { ...toRefs(state), test }
    }
}
</script>
