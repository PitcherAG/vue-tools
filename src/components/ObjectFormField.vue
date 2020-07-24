<template>
    <sui-form-field :error="error" :required="field.required" v-if="field.updateable">
        <label>{{ label || field.label }}</label>
        <input
            :maxlength="field.length"
            :value="value"
            @input="emitInput($event.target.value)"
            placeholder=""
            type="text"
            v-bind="field.settings"
            v-if="
                field.type === 'string' || field.type === 'phone' || field.type === 'url' || field.type === 'combobox'
            "
        />
        <textarea
            :maxlength="field.length"
            :value="value"
            @input="emitInput($event.target.value)"
            v-bind="field.settings"
            v-if="field.type === 'textarea' || field.type === 'address'"
        />
        <Dropdown
            :default-text="$gettext('Select')"
            :items="picklist"
            :multiple="field.type === 'multipicklist'"
            :value="value"
            @input="emitInput($event)"
            add-class="selection"
            v-bind="field.settings"
            v-if="field.type === 'picklist' || field.type === 'multipicklist'"
        />
        <Dropdown
            :default-text="$gettext('Select')"
            :items="field.references"
            :multiple="field.type === 'multipicklist'"
            :value="value"
            @input="emitInput($event)"
            add-class="selection"
            v-bind="field.settings"
            v-if="field.type === 'reference'"
        />

        <Calendar
            :default-text="field.type === 'date' ? $gettext('Date') : $gettext('Date/Time')"
            :type="field.type"
            :value="value"
            @input="emitInput($event)"
            v-bind="field.settings"
            v-if="field.type === 'date' || typ === 'datetime'"
        />

        <input
            :numpadDecimalPlaces="field.digits"
            :numpadGroup="'ObjectFormField'"
            :numpadIndex="index"
            :value="value"
            @input="emitInput($event.target.value)"
            placeholder=""
            step="any"
            style="width:85px;"
            type="number"
            v-bind="field.settings"
            v-if="field.type === 'double' || field.type === 'currency' || field.type === 'int'"
        />
        <!--input v-if="field.type=== 'double' || field.type==='currency' || field.type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any"-->
        <Checkbox
            :value="value"
            @input="v => emitInput(v)"
            toggle
            v-bind="field.settings"
            v-if="field.type === 'boolean'"
        />
    </sui-form-field>
    <!-- not updateable -->
    <sui-form-field :style="{ minHeight: !value ? '60px' : undefined }" v-else>
        <label>{{ label || field.label }}</label>
        <div class="pt-2" style="font-size:1.175em">
            <!-- bool -->
            <template v-if="field.type === 'boolean'">
                {{ value ? 'yes' : 'no' }}
            </template>
            <!-- currency -->
            <template v-else-if="field.type === 'currency'">
                {{ formatCurrency(value) }}
            </template>
            <!-- date -->
            <template v-else-if="field.type === 'date' || field.type === 'datetime'">
                {{ formatDate(value) }}
            </template>
            <!-- default -->
            <template v-else>
                {{ valueLabel || value }}
            </template>
        </div>
    </sui-form-field>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import Dropdown from './Dropdown'
import Calendar from './Calendar'
import Checkbox from './Checkbox'
import { formatCurrency, formatDate } from '..'

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
        valueLabel: {},
        label: {
            type: String
        }
    },
    setup(props, ctxt) {
        const emit = ctxt.emit
        const picklist = ref([])
        if (props.field) {
            if (props.field.type === 'boolean' && !props.value) {
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
                type: props.field.type,
                showError: props.showError
            }
            emit('fieldChange', fieldChange)
            emit('input', value)
        }

        const log = (a, b, c) => {
            console.log(a, b, c)
        }

        return { picklist, emitInput, error, log, formatDate, formatCurrency }
    }
}
</script>

<style scoped></style>
