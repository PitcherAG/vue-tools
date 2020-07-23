<template>
    <sui-form-field :error="error" :required="field.required" v-if="field.updateable">
        <label>{{ label || field.label }}</label>
        <input
            :maxlength="field.length"
            :value="value"
            @input="emitInput($event.target.value)"
            placeholder=""
            v-bind="field.settings"
            type="text"
            v-if="typ === 'string' || typ === 'phone' || typ === 'url' || typ === 'combobox'"
        />
        <textarea
            :maxlength="field.length"
            :value="value"
            @input="emitInput($event.target.value)"
            v-bind="field.settings"
            v-if="typ === 'textarea' || typ === 'address'"
        />
        <Dropdown
            :default-text="$gettext('Select')"
            :items="picklist"
            :multiple="typ === 'multipicklist'"
            :value="value"
            @input="emitInput($event)"
            add-class="selection"
            v-bind="field.settings"
            v-if="typ === 'picklist' || typ === 'multipicklist'"
        />
        <Dropdown
            :default-text="$gettext('Select')"
            :items="field.references"
            :multiple="typ === 'multipicklist'"
            :value="value"
            @input="emitInput($event)"
            add-class="selection"
            v-bind="field.settings"
            v-if="typ === 'reference'"
        />

        <Calendar
            :default-text="typ === 'date' ? $gettext('Date') : $gettext('Date/Time')"
            :type="typ"
            :value="value"
            @input="emitInput($event)"
            v-if="typ === 'date' || typ === 'datetime'"
            v-bind="field.settings"
        />

        <input
            :numpadDecimalPlaces="field.digits"
            :numpadGroup="'ObjectFormField'"
            :numpadIndex="index"
            :value="value"
            @input="emitInput($event.target.value)"
            placeholder=""
            v-bind="field.settings"
            step="any"
            style="width:85px;"
            type="number"
            v-if="typ === 'double' || typ === 'currency' || typ === 'int'"
        />
        <!--input v-if="type=== 'double' || type==='currency' || type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any"-->
        <Checkbox :value="value" @input="v => emitInput(v)" v-bind="field.settings" toggle v-if="typ === 'boolean'" />
    </sui-form-field>
    <!-- not updateable -->
    <sui-form-field :style="{ minHeight: !value ? '60px' : undefined }" v-else>
        <label>{{ label || field.label }}</label>
        <div class="pt-2" style="font-size:1.175em">
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
                {{ valueLabel || value }}
            </template>
        </div>
    </sui-form-field>
</template>

<script>
import { computed, ref, onMounted } from '@vue/composition-api'
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
        const typ = ref()
        const picklist = ref([])
        if (props.field) {
            const type = props.field.type
            typ.value = type
            if (typ.value === 'boolean' && !props.value) {
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
