<template>
    <div>
        <h3>Filter</h3>
        <div class="ui divider" />

        <!-- default usage -->
        <h4>Default usage</h4>
        <FilterDropdown title="Cities" v-model="recordTypeSaved" :items="recordTypes" @input="test" />
        <br />
        <br />

        <h4>String array example</h4>
        <FilterDropdown
            title="Cities"
            color="blue"
            inverted
            v-model="recordTypeSingleSaved"
            :items="recordTypesSingle"
            @input="test"
        />
        <br />
        <br />

        <h4>Complex example</h4>
        <div class="d-flex">
            <template v-for="(f, i) in filters">
                <FilterDropdown
                    v-model="f.val"
                    class="mx-1"
                    :key="i"
                    :title="f.name"
                    :items="f.options"
                    return-type="object"
                    basic
                    fluid
                    @input="test"
                />
            </template>
        </div>
    </div>
</template>

<script>
import FilterDropdown from '@/components/FilterDropdown'
import { reactive, toRefs } from '@vue/composition-api'

export default {
    components: {
        FilterDropdown
    },
    props: {},
    setup() {
        const state = reactive({
            recordTypeSaved: [],
            recordTypes: [
                {
                    text: 'Cantons',
                    type: 'header',
                    description: 5
                },
                {
                    text: 'Zürich',
                    value: 'zurich',
                    description: 15
                },
                {
                    type: 'divider'
                },
                {
                    text: 'Aargau',
                    value: 'aargau',
                    description: 2
                },
                {
                    text: 'Vaud',
                    value: 'vaud',
                    disabled: true,
                    description: 0
                },
                {
                    text: 'Ticino',
                    value: 'ticino',
                    description: 3
                },
                {
                    text: 'Bern',
                    value: 'bern',
                    description: 12
                },
                {
                    text: 'Lucerne',
                    value: 'lucerne',
                    description: 123
                },
                {
                    text: 'Geneva',
                    value: 'geneva',
                    description: 44
                }
            ],
            recordTypesSingle: ['Zurich', 'Ticino', 'Vaud', 'Lucerne', 'Geneva'],
            recordTypeSingleSaved: [],
            selectedFilter: '',
            filters: [
                {
                    field: 'product.SCT_Division__c',
                    object: 'Product2',
                    name: 'Division',
                    val: [],
                    options: [
                        { value: 'Others', text: 'Others' },
                        { value: 'Novartis PH', text: 'Novartis PH' },
                        { value: 'Hexal', text: 'Hexal' },
                        { value: '1A Pharma', text: '1A Pharma' },
                        { value: 'Novartis CH', text: 'Novartis CH' },
                        { value: 'Novartis DG', text: 'Novartis DG' },
                        { value: 'EBEWE', text: 'EBEWE' }
                    ]
                },
                {
                    field: 'product.SCT_Brand__c',
                    object: 'Product2',
                    name: 'Brand',
                    val: [],
                    options: [
                        { value: 'qw41', text: 'qw41' },
                        { value: 'qw17', text: 'qw17' },
                        { value: 'qw20', text: 'qw20' },
                        { value: 'qw8', text: 'qw8' },
                        { value: 'qw9', text: 'qw9' },
                        { value: 'qw10', text: 'qw10' },
                        { value: 'qw11', text: 'qw11' },
                        { value: 'qw12', text: 'qw12' },
                        { value: 'qw13', text: 'qw13' },
                        { value: 'qw14', text: 'qw14' },
                        { value: 'qw15', text: 'qw15' },
                        { value: 'qw16', text: 'qw16' },
                        { value: 'qw18', text: 'qw18' },
                        { value: 'qw19', text: 'qw19' },
                        { value: 'qw81', text: 'qw81' },
                        { value: 'qw21', text: 'qw21' },
                        { value: 'qw22', text: 'qw22' },
                        { value: 'qw23', text: 'qw23' },
                        { value: 'qw24', text: 'qw24' },
                        { value: 'qw25', text: 'qw25' },
                        { value: 'qw26', text: 'qw26' },
                        { value: 'qw27', text: 'qw27' },
                        { value: 'qw28', text: 'qw28' },
                        { value: 'qw29', text: 'qw29' },
                        { value: 'qw30', text: 'qw30' },
                        { value: 'qw31', text: 'qw31' },
                        { value: 'qw32', text: 'qw32' },
                        { value: 'qw33', text: 'qw33' },
                        { value: 'qw34', text: 'qw34' },
                        { value: 'qw35', text: 'qw35' },
                        { value: 'qw36', text: 'qw36' },
                        { value: 'qw37', text: 'qw37' },
                        { value: 'qw40', text: 'qw40' },
                        { value: 'qw45', text: 'qw45' },
                        { value: 'qw54', text: 'qw54' },
                        { value: 'qw82', text: 'qw82' },
                        { value: 'qw51', text: 'qw51' },
                        { value: 'qw47', text: 'qw47' },
                        { value: 'qw50', text: 'qw50' },
                        { value: 'qw67', text: 'qw67' },
                        { value: 'qw52', text: 'qw52' },
                        { value: 'qw60', text: 'qw60' },
                        { value: 'qw66', text: 'qw66' },
                        { value: 'qw53', text: 'qw53' },
                        { value: 'qw95', text: 'qw95' },
                        { value: 'qw80', text: 'qw80' },
                        { value: 'qw99', text: 'qw99' },
                        { value: 'qw61', text: 'qw61' },
                        { value: 'qw57', text: 'qw57' },
                        { value: 'qw48', text: 'qw48' },
                        { value: 'qw107', text: 'qw107' },
                        { value: 'qw42', text: 'qw42' },
                        { value: 'qw69', text: 'qw69' },
                        { value: 'qw92', text: 'qw92' },
                        { value: 'qw106', text: 'qw106' },
                        { value: 'qw103', text: 'qw103' },
                        { value: 'qw93', text: 'qw93' },
                        { value: 'qw102', text: 'qw102' },
                        { value: 'qw78', text: 'qw78' },
                        { value: 'qw79', text: 'qw79' },
                        { value: 'qw71', text: 'qw71' },
                        { value: 'qw100', text: 'qw100' },
                        { value: 'qw73', text: 'qw73' },
                        { value: 'qw76', text: 'qw76' },
                        { value: 'qw104', text: 'qw104' },
                        { value: 'qw96', text: 'qw96' },
                        { value: 'qw39', text: 'qw39' },
                        { value: 'qw44', text: 'qw44' },
                        { value: 'qw85', text: 'qw85' },
                        { value: 'qw94', text: 'qw94' },
                        { value: 'qw101', text: 'qw101' },
                        { value: 'qw55', text: 'qw55' },
                        { value: 'qw68', text: 'qw68' },
                        { value: 'qw105', text: 'qw105' },
                        { value: 'qw77', text: 'qw77' },
                        { value: 'qw90', text: 'qw90' },
                        { value: 'qw38', text: 'qw38' },
                        { value: 'qw74', text: 'qw74' },
                        { value: 'qw64', text: 'qw64' },
                        { value: 'qw70', text: 'qw70' },
                        { value: 'qw91', text: 'qw91' },
                        { value: 'qw75', text: 'qw75' },
                        { value: 'qw56', text: 'qw56' },
                        { value: 'qw72', text: 'qw72' },
                        { value: 'qw43', text: 'qw43' },
                        { value: 'qw49', text: 'qw49' },
                        { value: 'qw59', text: 'qw59' },
                        { value: 'qw46', text: 'qw46' },
                        { value: 'qw98', text: 'qw98' },
                        { value: 'qw86', text: 'qw86' },
                        { value: 'qw62', text: 'qw62' },
                        { value: 'qw63', text: 'qw63' },
                        { value: 'qw87', text: 'qw87' },
                        { value: 'qw58', text: 'qw58' },
                        { value: 'qw97', text: 'qw97' },
                        { value: 'qw88', text: 'qw88' },
                        { value: 'qw83', text: 'qw83' },
                        { value: 'qw84', text: 'qw84' },
                        { value: 'qw89', text: 'qw89' },
                        { value: 'qw65', text: 'qw65' },
                        { value: 'qw1', text: 'qw1' }
                    ]
                },
                {
                    field: 'product.SCT_Dosage_Form__c',
                    object: 'Product2',
                    name: 'Dosage Form',
                    val: [],
                    options: [
                        { value: 'TABLET', text: 'TABLET' },
                        { value: 'HARD GELATINE CAPSULE', text: 'HARD GELATINE CAPSULE' },
                        { value: 'TABLET FILM-COATED', text: 'TABLET, FILM-COATED' },
                        { value: 'LIQUID IN SYRINGE', text: 'LIQUID IN SYRINGE' },
                        { value: 'TABLET PROLONGED RELEASE', text: 'TABLET, PROLONGED RELEASE' },
                        { value: 'TABLET GASTRO-RESISTANT', text: 'TABLET, GASTRO-RESISTANT' },
                        { value: 'TABLET ORAL DISINTEGRATING', text: 'TABLET, ORAL DISINTEGRATING' },
                        {
                            value: 'POWDER FOR SOLUTION FOR INJECTION/INFUSION',
                            text: 'POWDER FOR SOLUTION FOR INJECTION/INFUSION'
                        },
                        { value: 'LIQUID IN AMPOULE', text: 'LIQUID IN AMPOULE' },
                        { value: 'TABLET SUGAR-COATED', text: 'TABLET, SUGAR-COATED' },
                        { value: 'LIQUID AS DROPS', text: 'LIQUID AS DROPS' }
                    ]
                },
                {
                    field: 'product.SCT_Molecule__c',
                    object: 'Product2',
                    name: 'Molecule',
                    val: [],
                    options: [
                        { value: 'qw41', text: 'qw41' },
                        { value: 'qw17', text: 'qw17' },
                        { value: 'qw20', text: 'qw20' },
                        { value: 'qw8', text: 'qw8' },
                        { value: 'qw9', text: 'qw9' },
                        { value: 'qw10', text: 'qw10' },
                        { value: 'qw11', text: 'qw11' },
                        { value: 'qw12', text: 'qw12' },
                        { value: 'qw13', text: 'qw13' },
                        { value: 'qw14', text: 'qw14' },
                        { value: 'qw15', text: 'qw15' },
                        { value: 'qw16', text: 'qw16' },
                        { value: 'qw18', text: 'qw18' },
                        { value: 'qw19', text: 'qw19' },
                        { value: 'qw81', text: 'qw81' },
                        { value: 'qw21', text: 'qw21' },
                        { value: 'qw22', text: 'qw22' },
                        { value: 'qw23', text: 'qw23' },
                        { value: 'qw24', text: 'qw24' },
                        { value: 'qw25', text: 'qw25' },
                        { value: 'qw26', text: 'qw26' },
                        { value: 'qw27', text: 'qw27' },
                        { value: 'qw28', text: 'qw28' },
                        { value: 'qw29', text: 'qw29' },
                        { value: 'qw30', text: 'qw30' },
                        { value: 'qw31', text: 'qw31' },
                        { value: 'qw32', text: 'qw32' },
                        { value: 'qw33', text: 'qw33' },
                        { value: 'qw34', text: 'qw34' },
                        { value: 'qw35', text: 'qw35' },
                        { value: 'qw36', text: 'qw36' },
                        { value: 'qw37', text: 'qw37' },
                        { value: 'qw40', text: 'qw40' },
                        { value: 'qw45', text: 'qw45' },
                        { value: 'qw54', text: 'qw54' },
                        { value: 'qw82', text: 'qw82' },
                        { value: 'qw51', text: 'qw51' },
                        { value: 'qw47', text: 'qw47' },
                        { value: 'qw50', text: 'qw50' },
                        { value: 'qw67', text: 'qw67' },
                        { value: 'qw52', text: 'qw52' },
                        { value: 'qw60', text: 'qw60' },
                        { value: 'qw66', text: 'qw66' },
                        { value: 'qw53', text: 'qw53' },
                        { value: 'qw95', text: 'qw95' },
                        { value: 'qw80', text: 'qw80' },
                        { value: 'qw99', text: 'qw99' },
                        { value: 'qw61', text: 'qw61' },
                        { value: 'qw57', text: 'qw57' },
                        { value: 'qw48', text: 'qw48' },
                        { value: 'qw107', text: 'qw107' },
                        { value: 'qw42', text: 'qw42' },
                        { value: 'qw69', text: 'qw69' },
                        { value: 'qw92', text: 'qw92' },
                        { value: 'qw106', text: 'qw106' },
                        { value: 'qw103', text: 'qw103' },
                        { value: 'qw93', text: 'qw93' },
                        { value: 'qw102', text: 'qw102' },
                        { value: 'qw78', text: 'qw78' },
                        { value: 'qw79', text: 'qw79' },
                        { value: 'qw71', text: 'qw71' },
                        { value: 'qw100', text: 'qw100' },
                        { value: 'qw73', text: 'qw73' },
                        { value: 'qw76', text: 'qw76' },
                        { value: 'qw104', text: 'qw104' },
                        { value: 'qw96', text: 'qw96' },
                        { value: 'qw39', text: 'qw39' },
                        { value: 'qw44', text: 'qw44' },
                        { value: 'qw85', text: 'qw85' },
                        { value: 'qw94', text: 'qw94' },
                        { value: 'qw101', text: 'qw101' },
                        { value: 'qw55', text: 'qw55' },
                        { value: 'qw68', text: 'qw68' },
                        { value: 'qw105', text: 'qw105' },
                        { value: 'qw77', text: 'qw77' },
                        { value: 'qw90', text: 'qw90' },
                        { value: 'qw38', text: 'qw38' },
                        { value: 'qw74', text: 'qw74' },
                        { value: 'qw64', text: 'qw64' },
                        { value: 'qw70', text: 'qw70' },
                        { value: 'qw91', text: 'qw91' },
                        { value: 'qw75', text: 'qw75' },
                        { value: 'qw56', text: 'qw56' },
                        { value: 'qw72', text: 'qw72' },
                        { value: 'qw43', text: 'qw43' },
                        { value: 'qw49', text: 'qw49' },
                        { value: 'qw59', text: 'qw59' },
                        { value: 'qw46', text: 'qw46' },
                        { value: 'qw98', text: 'qw98' },
                        { value: 'qw86', text: 'qw86' },
                        { value: 'qw62', text: 'qw62' },
                        { value: 'qw63', text: 'qw63' },
                        { value: 'qw87', text: 'qw87' },
                        { value: 'qw58', text: 'qw58' },
                        { value: 'qw97', text: 'qw97' },
                        { value: 'qw88', text: 'qw88' },
                        { value: 'qw83', text: 'qw83' },
                        { value: 'qw84', text: 'qw84' },
                        { value: 'qw89', text: 'qw89' },
                        { value: 'qw65', text: 'qw65' },
                        { value: 'qw1', text: 'qw1' }
                    ]
                }
            ]
        })

        function test(v) {
            // console.log(v)
        }

        return { ...toRefs(state), test }
    }
}
</script>
