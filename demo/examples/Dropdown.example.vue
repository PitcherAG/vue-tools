<template>
    <div>
        <h3>Dropdown</h3>
        <div class="ui divider" />

        <!-- default usage -->
        <Dropdown
            v-model="recordTypeSaved"
            :items="recordTypes"
            clearable
            searchable
            multiple
            icon="filter"
            @input="onInput"
        />
        <br />
        <br />
        <button class="ui button small" @click="setValue">update</button>
        <br />
        <br />
        <br />

        <!-- slot example -->
        <Dropdown v-model="slotModel" class="ui dropdown left pointing icon button">
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

        <!-- Advanced slot example -->
        <Dropdown v-model="slotModel2" class="fluid multiple search selection">
            <input type="hidden" name="country" />
            <i class="dropdown icon" />
            <div v-if="!slotModel2 || slotModel2.length < 1" class="default">Select Country</div>
            <div class="text" />
            <div class="menu">
                <div class="item" data-value="au"><i class="au flag" />Australia</div>
                <div class="item" data-value="at"><i class="at flag" />Austria</div>
                <div class="item" data-value="be"><i class="be flag" />Belgium</div>
                <div class="item" data-value="br"><i class="br flag" />Brazil</div>
                <div class="item" data-value="cn"><i class="cn flag" />China</div>
                <div class="item" data-value="cz"><i class="cz flag" />Czech Republic</div>
                <div class="item" data-value="dk"><i class="dk flag" />Denmark</div>
                <div class="item" data-value="gb"><i class="gb flag" />England</div>
                <div class="item" data-value="fi"><i class="fi flag" />Finland</div>
                <div class="item" data-value="fr"><i class="fr flag" />France</div>
                <div class="item" data-value="de"><i class="de flag" />Germany</div>
                <div class="item" data-value="it"><i class="it flag" />Italy</div>
                <div class="item" data-value="li"><i class="li flag" />Liechtenstein</div>
                <div class="item" data-value="mx"><i class="mx flag" />Mexico</div>
                <div class="item" data-value="nl"><i class="nl flag" />Netherlands</div>
                <div class="item" data-value="no"><i class="no flag" />Norway</div>
                <div class="item" data-value="pl"><i class="pl flag" />Poland</div>
                <div class="item" data-value="pt"><i class="pt flag" />Portugal</div>
                <div class="item" data-value="sg"><i class="sg flag" />Singapore</div>
                <div class="item" data-value="kr"><i class="kr flag" />South Korea</div>
                <div class="item" data-value="es"><i class="es flag" />Spain</div>
                <div class="item" data-value="se"><i class="se flag" />Sweden</div>
                <div class="item" data-value="ch"><i class="ch flag" />Switzerland</div>
                <div class="item" data-value="tr"><i class="tr flag" />Turkey</div>
                <div class="item" data-value="ua"><i class="ua flag" />Ukraine</div>
                <div class="item" data-value="us"><i class="us flag" />United States</div>
            </div>
        </Dropdown>
        <br />
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
            recordTypeSaved: 'bern',
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
            slotModel: '',
            slotModel2: []
        })

        function setValue() {
            console.warn('before', state.recordTypeSaved)
            state.recordTypeSaved = 'zurich'
            console.warn('after', state.recordTypeSaved)
        }
        function onInput(v) {
            console.warn('input:', v)
        }

        return { ...toRefs(state), setValue, onInput }
    }
}
</script>
