<template>
    <sui-form-field :required="field.required" :error="error">
        <label>{{ field.label }}</label>
        <input v-if="type==='string'|| type==='phone' || type==='url'" type="text" placeholder=""
               :value="value" v-on:input="$emit('input', $event.target.value)" :maxlength="field.length">
        <textarea v-if="type==='textarea' || type==='address'" v-on:input="$emit('input', $event.target.value)"
                  :value="value"
                  :maxlength="field.length"></textarea>
        <Dropdown v-if="type==='picklist' || type==='multipicklist'" defaultText="Select"
                  :multiple="type==='multipicklist'"
                  v-on:input="$emit('input', $event.target.value)"
                  :value="value" :options="picklists" addClass="selection"></Dropdown>
        <Dropdown v-if="type==='reference'" defaultText="Select" :multiple="type==='multipicklist'"
                   v-on:input="$emit('input', $event)" :value="value"
                  :options="field.references" addClass="selection"></Dropdown>


        <div v-if="type === 'date'" class="ui calendar">
            <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="Date" v-model="value"
                       data-bind="value: value, attr:{placeholder: viewModel.trans('Date')}">
            </div>
        </div>
        <div v-if="type== 'datetime'" class="ui datetime">
            <div class="ui input left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="Date/Time" v-model="value"
                       data-bind="value: value, attr:{placeholder: viewModel.trans('Date/Time')}">
            </div>
        </div>
        <input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any">
        <sui-checkbox v-if="type=== 'boolean'" toggle v-model="value"/>
    </sui-form-field>
</template>

<script>
    import { computed, ref } from '@vue/composition-api'
    import Dropdown from './Dropdown'

    export default {
        name: 'ObjectFormField',
        components: { Dropdown },
        props: ['field', 'index', 'showError', 'value'],
        setup(props, attrs) {

            const type = props.field.type
            const picklist = ref([])
            for (const v of props.field.picklistValues) {
                picklist.value.push({ text: v.label, value: v.value })
            }

            const error = computed(() => {
                return !props.field.valid(props.value) && props.showError
            })

            return { type, picklist, error }
        }
    }
</script>

<style scoped>

</style>
