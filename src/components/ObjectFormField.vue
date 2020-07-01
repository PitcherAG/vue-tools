<template>
    <sui-form-field v-if="field.updateable" :required="field.required" :error="error">
        <label>{{ label || field.label }}</label>
        <input
            v-if="typ === 'string' || typ === 'phone' || typ === 'url' || typ === 'combobox'"
            type="text"
            placeholder=""
            :value="value"
            @input="emitInput($event.target.value)"
            :maxlength="field.length"
        />
        <textarea
            v-if="typ === 'textarea' || typ === 'address'"
            @input="emitInput($event.target.value)"
            :value="value"
            :maxlength="field.length"
        />
        <Dropdown
            v-if="typ === 'picklist' || typ === 'multipicklist'"
            :default-text="$gettext('Select')"
            :multiple="typ === 'multipicklist'"
            @input="emitInput($event)"
            :value="value"
            :items="picklist"
            add-class="selection"
        />
        <Dropdown
            v-if="typ === 'reference'"
            :default-text="$gettext('Select')"
            :multiple="typ === 'multipicklist'"
            @input="emitInput($event)"
            :value="value"
            :items="field.references"
            add-class="selection"
        />

        <Calendar
            v-if="typ === 'date' || typ === 'datetime'"
            :type="typ"
            @input="emitInput($event)"
            :default-text="typ === 'date' ? $gettext('Date') : $gettext('Date/Time')"
            :value="value"
        />

        <input
            v-if="typ === 'double' || typ === 'currency' || typ === 'int'"
            :numpadIndex="index"
            :numpadGroup="'ObjectFormField'"
            :numpadDecimalPlaces="field.digits"
            :value="value"
            @input="emitInput($event.target.value)"
            placeholder=""
            style="width:85px;"
            type="number"
            step="any"
        />
        <!--input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any"-->
        <Checkbox v-if="typ === 'boolean'" :value="value" toggle @input="v => emitInput(v)" />
    </sui-form-field>
    <!-- not updateable -->
    <sui-form-field v-else>
        <label>{{ label || field.label }}</label>
        <!-- bool -->
        <template v-if="typ === 'boolean'">
            {{ value ? 'yes' : 'no' }}
        </template>
        <!-- currency -->
        <template v-else-if="typ === 'currency'">
            {{ formatCurrency(value) }}
        </template>
        <!-- date -->
        <template v-else-if="typ === 'date' || typ === 'datetime'">
            {{ formatDate(value) }}
        </template>
        <!-- default -->
        <template v-else>
            {{ value }}
        </template>
    </sui-form-field>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import Dropdown from './Dropdown'
import Calendar from './Calendar'
import Checkbox from './Checkbox'
import { formatDate, formatCurrency } from '..'

export default {
    name: 'ObjectFormField',
    components: { Checkbox, Calendar, Dropdown },
    props: {
        field: { required: true },
        index: {
            type: Number
        },
        showError: {},
        value: {},
        label: {
            type: String
        }
    },
    setup(props, { emit }) {
        const typ = ref()
        const picklist = ref([])
        if (props.field) {
            const type = props.field.type
            typ.value = type
            if (typ === 'boolean' && !props.value) {
                emit('input', false)
            }
        }
        if (props.field && props.field.picklistValues) {
            for (const v of props.field.picklistValues) {
                picklist.value.push({ text: v.label, value: v.value })
            }
        }

        const error = computed(() => {
            return props.field && !props.field.valid(props.value) && props.showError
        })

        function emitInput(value) {
            const fieldChange = {
                value,
                oldValue: props.value,
                field: props.field,
                label: props.label,
                type: typ.value,
                showError: props.showError
            }
            emit('fieldChange', fieldChange)
            emit('input', value)
        }

        const log = (a, b, c) => {
            console.log(a, b, c)
        }

        return { typ, picklist, emitInput, error, log, formatDate, formatCurrency }
    }
}
</script>

<style scoped></style>
