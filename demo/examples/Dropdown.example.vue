<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />

        <!-- default usage -->
        <Dropdown
            v-model="recordTypeSaved"
            :items="recordTypes"
            clearable
            multiple
            searchable
            icon="filter"
            @onSelected="test"
        />
        <br />
        <br />
        <br />

        <!-- slot example advanced -->
        <Dropdown class="ui dropdown left pointing icon button" v-model="slotModel" @input="test" @onSelected="test">
            <i class="settings icon" />
            <div class="menu">
                <div class="ui left search icon input">
                    <i class="search icon" />
                    <input type="text" name="search" placeholder="Search issues..." />
                </div>
                <div class="divider" />
                <div class="header">
                    <i class="tags icon" />
                    Filter by tag
                </div>
                <div class="item" data-value="important">
                    <div class="ui red empty circular label" />
                    Important
                </div>
                <div class="item" data-value="announcement">
                    <div class="ui blue empty circular label" />
                    Announcement
                </div>
                <div class="item" data-value="discussion">
                    <div class="ui black empty circular label" />
                    Discussion
                </div>
            </div>
        </Dropdown>
        <br />
        <br />
        <br />
        <button @click="test">test me</button>
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
            ],
            recordTypesSingle: ['Zurich', 'Ticino', 'Vaud', 'Lucerne', 'Geneva'],
            slotModel: ''
        })

        function test(v) {
            console.log(v)
        }

        return { ...toRefs(state), test }
    }
}
</script>
