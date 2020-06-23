<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />
        <Dropdown v-model="recordTypeSaved" :items="recordTypes" :default-text="recordTypes[0].text" />
        <br />
        <br />
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import { reactive, toRefs } from '@vue/composition-api'

export default {
    components: {
        Dropdown
    },
    props: {},
    setup() {
        const state = reactive({
            recordTypeSaved: 'zurich',
            recordTypes: [
                {
                    text: 'Zürich',
                    value: 'zurich'
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
                }
            ]
        })

        return { ...toRefs(state) }
    }
}
</script>
