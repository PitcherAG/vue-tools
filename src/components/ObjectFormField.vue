<template>
    <sui-form-field :required="field.required">
        <label>{{ field.label }}</label>
        <input v-if="type==='string'|| type==='phone' || type==='url'" type="text" placeholder=""
               v-model="answer" :maxlength="field.length">
        <textarea v-if="type==='textarea' || type==='address'" :value="answer" :maxlength="field.length"></textarea>
        <Dropdown v-if="type==='picklist' || type==='multipicklist'" defaultText="Select"
                      :multiple="type==='multipicklist'"
                      v-model="answer" :options="picklists.value" addClass="selection"></Dropdown>
        <Dropdown v-if="type==='reference'" defaultText="Select" :multiple="type==='multipicklist'" v-model="answer"
                      :options="field.references.value" addClass="selection"></Dropdown>


        <div v-if="type === 'date'" class="ui calendar">
            <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="Date" v-model="answer"
                       data-bind="value: answer, attr:{placeholder: viewModel.trans('Date')}">
            </div>
        </div>
        <div v-if="type== 'datetime'" class="ui datetime">
            <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="Date/Time" v-model="answer"
                       data-bind="value: answer, attr:{placeholder: viewModel.trans('Date/Time')}">
            </div>
        </div>
        <input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="answer"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any">
        <sui-checkbox v-if="type=== 'boolean'" toggle v-model="answer"/>
    </sui-form-field>
</template>

<script>
    import { ref } from '@vue/composition-api'
    import Dropdown from './Dropdown'

    export default {
        name: 'ObjectFormField',
        components: { Dropdown },
        props: ['field', 'obj', 'index'],
        setup(props) {
            const answer = props.field.answer
            const type = props.field.type
            const picklist = ref([])
            for (const v of props.field.picklistValues) {
                picklist.value.push({ text: v.label, value: v.value })
            }
            return { answer, type, picklist }
        }
    }
</script>

<style scoped>

</style>
