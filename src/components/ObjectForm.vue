<template>
    <div>
        <div class="ui red negative segment transition visible" v-if="validationError">
            <div class="ui red header">
                <i class="disabled warning sign icon"></i>
                <div class="content">
                    {{ validationErrorTitle }}
                    <div class="sub header">
                        {{ validationErrorDescription }}
                    </div>
                </div>
            </div>
        </div>
        <sui-form v-if="state.needsRecordType && !validationError">
            <sui-form-field :required="true" :error="state.showErrors && !state.recordType">
                <label>Please select a Record Type</label>
                <Dropdown
                    defaultText="Select Record Type"
                    v-model="state.recordTypeSaved"
                    :options="state.recordTypes"
                    text-field="name"
                    value-field="recordTypeId"
                />
            </sui-form-field>
        </sui-form>
        <sui-form v-if="!state.needsRecordType && !validationError && !state.layout">
            <ObjectFormField
                v-for="(field, key) in state.fields"
                v-model="state.obj[field.name].value"
                :key="key"
                :field="field"
                :showError="state.showErrors"
            />
            <sui-button v-if="hasSave" type="submit">Save</sui-button>
        </sui-form>
        <sui-form v-if="!state.needsRecordType && !validationError && state.layout">
            <fragment v-for="(section, key) in state.layout.editLayoutSections" :key="key">
                <h4 class="ui header">{{ section.heading }}</h4>
                <div class="two fields" v-for="(row, key) in section.layoutRows" :key="key">
                    <fragment v-for="(item, key) in row.layoutItems" :key="key">
                        <ObjectFormField
                            v-if="!comp.exclude"
                            v-model="state.obj[comp.value].value"
                            v-for="(comp, key) in item.layoutComponents"
                            :key="key"
                            :field="comp.field"
                            :showError="state.showErrors"
                            :label="item.label"
                        ></ObjectFormField>
                    </fragment>
                </div>
            </fragment>
            <sui-button v-if="hasSave" type="submit">Save</sui-button>
        </sui-form>
    </div>
</template>

<script>
import { computed, reactive, ref, watch } from '@vue/composition-api'
import { loadSchema } from '../db/sfdcSchema'
import { useConfigStore } from '../config'
import ObjectFormField from './ObjectFormField'
import { contextQuery } from '../db/contextQuery'
import { saveObject } from '../app'
import Dropdown from './Dropdown'
import { Field } from '../db/sfdcField'
import { loadLayout } from '../db/sfdcLayout'

export default {
    components: { Dropdown, ObjectFormField },
    props: {
        objectType: {
            require: true,
            type: String
        },
        fields: {
            default: () => [],
            type: Array
        },
        excludeFields: {
            default: () => [],
            type: Array
        },
        hasSave: {
            type: Boolean
        },
        id: {
            type: String
        },
        recordType: {
            type: String
        },
        obj: {
            type: Object
        },
        onSave: {
            type: Function
        }
    },

    setup: function(props) {
        const excludes = [
            'attributes',
            'Id',
            'CreatedById',
            'CreatedDate',
            'Division',
            'IsDeleted',
            'LastActivityDate',
            'LastModifiedById',
            'LastModifiedDate',
            'SystemModstamp'
        ]
        const state = reactive({
            fields: [],
            id: props.id,
            obj: {},
            recordTypes: computed(() => {
                if (state.schema) {
                    return state.schema.recordTypeInfos
                }
                return []
            }),
            recordType: props.recordType,
            recordTypeId: computed(() => {
                if (state.loadedObj) {
                    return state.loadedObj.recordTypeId
                }
                if (state.recordType) {
                    for (const t of state.recordTypes) {
                        if (t.name === state.recordType) {
                            return t.recordTypeId
                        }
                    }
                } else if (state.recordTypes.length === 1) {
                    return state.recordTypes[0].recordTypeId
                }
            }),
            recordTypeSaved: '',
            externalId: '',
            externalIdFields: [],
            layout: null,
            schema: null,
            needsRecordType: computed(() => {
                return !state.recordTypeId
            }),
            isValid: computed(() => {
                let valid = true
                for (const field of state.fields) {
                    if (!field.valid(state.obj[field.name].value)) {
                        valid = false
                    }
                }
                return valid
            }),
            showErrors: true,
            result: computed(() => {
                const result = {
                    ignoreFields: []
                }
                let valid = true
                for (const field of state.fields) {
                    result[field.name] = state.obj[field.name].value
                    if (field.relationshipName && state.obj[field.name].value) {
                        let found = false
                        for (const ref of field.references) {
                            if (ref.value === state.obj[field.name].value) {
                                result[field.relationshipName] = {
                                    Id: ref.value,
                                    Name: ref.text
                                }
                                result.ignoreFields.push(field.relationshipName)
                                found = true
                                break
                            }
                        }
                        if (!found) console.log('ref not found:' + field.name, state.obj[field.name].value)
                    }
                    if (
                        !field.nillable &&
                        (typeof result[field.name] == 'undefined' || String(result[field.name]) === 'null')
                    ) {
                        valid = false
                    }
                }
                return result
            })
        })

        const name = ref()

        watch(
            () => [props.objectType],
            async () => {
                if (!props.objectType) {
                    return
                }
                const schema = await loadSchema(props.objectType)
                state.schema = schema
            }
        )

        watch(
            () => [props.objectType, state.recordTypeId, state.schema],
            async () => {
                if (!props.objectType) {
                    return
                }
                if (!state.schema) {
                    return
                }
                if (!state.recordTypeId) {
                    return
                }
                let fields = []
                let req_fields = []

                const includeFields = props.fields
                const excludeFields = [...props.excludeFields]
                if (includeFields.length) {
                    // handle if field list is provided
                    for (const field_name of includeFields) {
                        if (field_name.trim()) {
                            for (const field of state.schema.fields) {
                                if (field.name === field_name.trim()) {
                                    const f = new Field(field, props.objectType)
                                    if (f.calculated || !f.updateable) {
                                        continue
                                    }
                                    req_fields.push(f)
                                }
                            }
                        }
                    }
                    state.fields = req_fields
                } else {
                    if (!state.recordTypeId) {
                        return
                    }
                    // handle if no field list is provided but we have a layout
                    let layout
                    try {
                        layout = await loadLayout(props.objectType, state.recordTypeId)
                    } catch (e) {
                        console.warn(
                            'layout support for this env not found. Cache table needs not only schema but layout describes as well'
                        )
                    }

                    if (layout) {
                        const data = []
                        const filed = []
                        for (const section of layout.editLayoutSections) {
                            for (const row of section.layoutRows) {
                                for (const row of section.layoutRows) {
                                    for (const item of row.layoutItems) {
                                        for (const comp of item.layoutComponents) {
                                            if (excludeFields.indexOf(comp.value) === -1) {
                                                const field = new Field(comp.details)
                                                fields.push(field)
                                                comp.field = field
                                                comp.exclude = false
                                            } else {
                                                comp.exclude = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        state.layout = layout
                        state.fields = fields
                    } else {
                        // handle if no field list is provided and we dont have a layout
                        for (const field of state.schema.fields) {
                            if (field.calculated || !field.updateable) {
                                continue
                            }
                            if (excludes.indexOf(field.name) === -1) {
                                let f
                                try {
                                    f = new Field(field, this)
                                } catch (e) {
                                    console.warn(e)
                                    excludeFields.push(field.name)
                                    console.warn('removed field')
                                    continue
                                }
                                if (f.nillable && f.name !== 'Name') {
                                    fields.push(f)
                                } else {
                                    req_fields.push(f)
                                }
                            }
                        }
                        for (const field of state.schema.fields) {
                            if (field.externalId) {
                                state.externalIdFields.push(field.name)
                            }
                        }
                        req_fields = req_fields.concat(fields)
                        req_fields = req_fields.filter(obj => {
                            for (const excludeField of excludeFields) {
                                if (obj.name === excludeField.trim()) {
                                    return false
                                }
                            }
                            return true
                        })
                        state.fields = req_fields
                    }
                }
                for (const field of state.fields) {
                    state.obj[field.name] = ref(null)
                    if (props.obj) {
                        state.obj[field.name].value = props.obj[field.name]
                    }
                }
            }
        )
        const validationError = computed(() => {
            const configStore = useConfigStore()
            const table = configStore.getCacheDict.value[props.objectType]
            if (!table.externalField && !props.id) {
                validationErrorTitle.value = 'You can not add an object of this type.'
                validationErrorDescription.value = 'This Object does not have an external ID field in the config.json.'
                return true
            }
            if (props.id && props.id.startsWith('PIT_') && !table.externalField) {
                validationErrorTitle.value = 'This Object is not editable. You need to sync first.'
                validationErrorDescription.value =
                    'This Object does not have an external ID field in the config.json. Please provide one or sync first before editing.'
                return true
            }
            return false
        })
        const validationErrorTitle = ref('')
        const validationErrorDescription = ref('')
        watch(
            () => [props.id, state.fields],
            async () => {
                state.showErrors = false
                if (state.fields.length === 0) {
                    return
                }
                if (!props.id) {
                    for (const field of state.fields) {
                        if (state.obj[field.name].value !== '') {
                            state.obj[field.name].value = null
                        }
                    }
                }
                state.id = props.id
                if (!props.id) {
                    return
                }
                if (validationError.value) {
                    return
                }
                const q = 'select * from {{' + props.objectType + "}} where Id='{{ id }}'"
                const data = await contextQuery(q, { id: props.id })
                name.value = data.Name
                state.loadedObj = data[0]
                for (const field of state.fields) {
                    state.obj[field.name].value = data[0][field.name]
                }
            }
        )

        const validate = () => {
            let valid = true
            for (const field of state.fields) {
                field.show_errors = true
                if (!field.valid.value) {
                    valid = false
                }
            }
            return valid
        }

        const save = extra => {
            if (state.needsRecordType && state.recordTypeSaved) {
                state.recordTypeId = state.recordTypeSaved
                state.showErrors = false
                return
            }
            if (!state.isValid) {
                state.showErrors = true
                return
            }
            const obj = {
                ...state.result,
                ...extra
            }
            if (state.recordTypeId && state.recordTypes.length > 1) {
                for (const t of state.recordTypes) {
                    if (t.recordTypeId === state.recordTypeId) {
                        obj.RecordType = {
                            Id: t.recordTypeId,
                            Name: t.name
                        }
                        obj.RecordTypeId = state.recordTypeId
                        obj.ignoreFields.push('RecordType')
                        break
                    }
                }
            }
            obj.LastModifiedDate = new Date().toISOString()
            obj.ignoreFields.push('LastModifiedDate')
            obj.objectType = props.objectType
            if (props.id) {
                obj.Id = props.id
            }
            window.console.info('save form', obj)
            saveObject(obj)
            return true
        }

        const clear = () => {
            for (const field of state.fields) {
                state.obj[field.name].value = null
            }
            state.showErrors = false
        }

        return {
            state,
            save,
            validate,
            clear,
            validationError,
            validationErrorTitle,
            validationErrorDescription,
            name
        }
    }
}
</script>

<style>
.ui.form .field > label {
    color: #7d7d7d;
}

.ui.form .field {
    margin-bottom: 1.3em !important;
}

.ui.form .ui.header {
    margin-top: 1.5em;
}

.ui.form .ui.header:first-child {
    margin-top: 0.5em;
}
</style>
