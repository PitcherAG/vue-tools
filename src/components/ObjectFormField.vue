<template>
  <SuiFormField
    v-if="field.updateable || field.settings.updateable"
    :error="error"
    :required="field.required && field.type !== 'boolean'"
  >
    <label>{{ label || field.label }}</label>
    <input
      v-if="field.type === 'string' || field.type === 'phone' || field.type === 'url' || field.type === 'combobox'"
      :maxlength="field.length"
      :value="value"
      placeholder=""
      type="text"
      v-bind="field.settings"
      @input="emitInput($event.target.value)"
    />
    <textarea
      v-if="field.type === 'textarea' || field.type === 'address'"
      :maxlength="field.length"
      :value="value"
      v-bind="field.settings"
      @input="emitInput($event.target.value)"
    />
    <Dropdown
      v-if="field.type === 'picklist' || field.type === 'multipicklist'"
      :defaultText="$gettext('Select')"
      :items="filteredValues"
      :multiple="field.type === 'multipicklist'"
      :value="value"
      addClass="selection"
      v-bind="field.settings"
      @input="emitInput($event)"
    />
    <Dropdown
      v-if="field.type === 'reference'"
      :defaultText="$gettext('Select')"
      :items="field.references.value"
      :multiple="field.type === 'multipicklist'"
      :value="value"
      addClass="selection"
      v-bind="field.settings"
      @input="emitInput($event)"
    />

    <Calendar
      v-if="field.type === 'date' || field.type === 'datetime'"
      :defaultText="field.type === 'date' ? $gettext('Date') : $gettext('Date/Time')"
      :type="field.type"
      :value="value || ''"
      v-bind="field.settings"
      @input="emitInput($event)"
    />

    <input
      v-if="field.type === 'double' || field.type === 'currency' || field.type === 'int'"
      :numpadDecimalPlaces="field.digits"
      :numpadGroup="'ObjectFormField'"
      :numpadIndex="index"
      :value="value"
      placeholder=""
      step="any"
      style="width:85px;"
      type="number"
      v-bind="field.settings"
      @input="emitInput($event.target.value)"
    />
    <!-- input v-if="field.type=== 'double' || field.type==='currency' || field.type==='int'" :numpadIndex="index"
               :numpadGroup="'ObjectFormField'" :numpadDecimalPlaces="field.digits" v-model="value"
               placeholder=""
               style="width:85px;"
               type="number"
               readonly="readonly"
               step="any" -->
    <Checkbox
      v-if="field.type === 'boolean'"
      :value="value"
      toggle
      v-bind="field.settings"
      @input="(v) => emitInput(v)"
    />
    <small v-if="!hideHelpText && field.inlineHelpText" class="helper">{{ field.inlineHelpText }}</small>
  </SuiFormField>
  <!-- not updateable -->
  <SuiFormField v-else :style="{ minHeight: !value ? '1em' : undefined }">
    <label>{{ label || field.label }}</label>
    <div>
      <template v-if="value">
        <template v-if="valueLabel">
          {{ valueLabel }}
        </template>
        <template v-else>
          <!-- Bool -->
          <template v-if="field.type === 'boolean'">
            {{ value ? 'yes' : 'no' }}
          </template>
          <!-- Currency -->
          <template v-else-if="field.type === 'currency'">
            {{ formatCurrency(value, forceCurrencyCode) }}
          </template>
          <!-- Date -->
          <template v-else-if="field.type === 'date' || field.type === 'datetime'">
            {{ formatDate(value) }}
          </template>
          <!-- Reference -->
          <template v-else-if="field.type === 'reference'">
            {{ getReferenceName() }}
          </template>
          <!-- Default -->
          <template v-else>
            {{ value }}
          </template>
        </template>
      </template>
      <span v-else class="ui grey text">
        -
      </span>
    </div>
  </SuiFormField>
</template>

<script>
import Calendar from './Calendar'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import { computed, ref } from '@vue/composition-api'
import { formatCurrency, formatDate } from '..'

export default {
  name: 'ObjectFormField',
  components: { Checkbox, Calendar, Dropdown },
  props: {
    field: {
      type: Object,
      required: true,
    },
    forceCurrencyCode: {
      default: '',
      type: String,
    },
    index: {
      type: Number,
    },
    hideHelpText: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    valueLabel: {
      type: String,
    },
    label: {
      type: String,
    },
    obj: {
      type: Object,
      required: false,
    },
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

    const filteredValues = computed(() => {
      const newValues = props.field.filteredValues ? props.field.filteredValues : picklist.value

      return newValues.map((p) => {
        return { text: p.label, value: p.value }
      })
    })

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
        showError: props.showError,
      }

      emit('fieldChange', fieldChange)
      emit('input', value)
    }

    function getReferenceName() {
      let fieldName = props.field.name

      if (fieldName.endsWith('__c')) {
        fieldName = fieldName.replace('__c', '__r')
      } else {
        fieldName = fieldName.substr(0, fieldName.length - 2)
      }
      if (props.obj[fieldName]) {
        return props.obj[fieldName].Name
      } else {
        console.warn(`referenced object name not found. Add ${fieldName} to query.`)

        return props.value
      }
    }

    return {
      filteredValues,
      emitInput,
      error,
      formatDate,
      formatCurrency,
      getReferenceName,
    }
  },
}
</script>

<style scoped></style>
