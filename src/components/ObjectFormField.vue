<template>
    <sui-form-field :required="field.required" :error="error" :disabled="!field.updateable">
        <label>{{ label || field.label }}</label>
        <input v-if="type==='string'|| type==='phone' || type==='url' || type==='combobox'" type="text" placeholder=""
               :value="value" v-on:input="$emit('input', $event.target.value)" :maxlength="field.length">
        <textarea v-if="type==='textarea' || type==='address'" v-on:input="$emit('input', $event.target.value)"
                  :value="value"
                  :maxlength="field.length"></textarea>
        <Dropdown v-if="type==='picklist' || type==='multipicklist'" defaultText="Select"
                  :multiple="type==='multipicklist'"
                  v-on:input="$emit('input', $event)"
                  :value="value" :options="picklist" addClass="selection"></Dropdown>
        <Dropdown v-if="type==='reference'" defaultText="Select" :multiple="type==='multipicklist'"
                  v-on:input="$emit('input', $event)" :value="value"
                  :options="field.references" addClass="selection"></Dropdown>

        <Calendar v-if="type === 'date' || type=== 'datetime'" :type="type"
                  v-on:input="$emit('input', $event)" :default-text="type=='date'?'Date':'Date/Time'"
                  :value="value"></Calendar>

        <input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" :value="value"
               v-on:input="$emit('input', $event.target.value)"
               placeholder=""
               style="width:85px;"
               type="number"
               step="any">
        <!--input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any"-->
        <sui-checkbox v-if="type=== 'boolean'" toggle :value="value ? 'on':'off'"
                      v-on:input="$emit('input', $event.target.value == 'on')"/>
    </sui-form-field>
</template>

<script>
    import { computed, ref } from '@vue/composition-api'
    import Dropdown from './Dropdown'
    import Calendar from './Calendar'

    export default {
        name: 'ObjectFormField',
        components: { Calendar, Dropdown },
        props: ['field', 'index', 'showError', 'value', 'label'],
        setup(props, attrs) {

            const type = props.field.type
            const picklist = ref([])
            for (const v of props.field.picklistValues) {
                picklist.value.push({ text: v.label, value: v.value })
            }

            const error = computed(() => {
                return !props.field.valid(props.value) && props.showError
            })

            const log = (a, b, c) => {
                console.log(a, b, c)
            }
            if (type === 'boolean' && !props.value) {
                attrs.emit('input', false)
            }
            return { type, picklist, error, log }
        }
    }
</script>

<style scoped>

</style>
