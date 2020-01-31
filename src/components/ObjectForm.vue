<template>
    <div>
        <sui-form>
            <ObjectFormField v-for="(field, key) in state.fields" :key="key" :field="field"
                             :showError="state.showErrors" v-model="state.obj[field.name].value"></ObjectFormField>
            <sui-button v-if="hasSave" type="submit">Save</sui-button>
        </sui-form>
    </div>
</template>

<script>
    import { computed, reactive, ref, watch } from '@vue/composition-api'
    import ObjectFormField from './ObjectFormField'
    import { useConfigStore } from '../config'
    import { Field, loadSchema } from '../db/sfdcSchema'
    import { contextQuery } from '../db/contextQuery'
    import { saveObject } from '../app'

    export default {
        name: 'ObjectForm',
        components: { ObjectFormField },
        props: ['objectName', 'fields', 'hasSave', 'id', 'obj', 'onSave'],
        setup(props) {
            const configStore = useConfigStore()
            const excludes = ['attributes', 'Id', 'CreatedById', 'CreatedDate', 'Division', 'IsDeleted', 'LastActivityDate', 'LastModifiedById', 'LastModifiedDate', 'SystemModstamp']
            const state = reactive({
                fields: [],
                id: null,
                obj: {},
                table: computed(() => configStore.getTableDict[props.objectName]),
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
                    const result = {}
                    let valid = true
                    for (const field of state.fields) {
                        result[field.name] = state.obj[field.name].value
                        if (!field.nillable && (typeof result[field.name] == 'undefined' || String(result[field.name]) === 'null')) {
                            valid = false
                        }
                    }
                    return result
                }),
            })
            watch(
                async () => {
                    if (!props.objectName) {
                        return
                    }
                    let fields = []
                    let req_fields = []
                    const schema = await loadSchema(props.objectName)
                    if (!schema) {
                        return
                    }
                    const includeFields = props.fields
                    if (includeFields.length) {
                        for (const field_name of includeFields) {
                            if (field_name.trim()) {

                                for (const field of schema.fields) {
                                    if (field.name === field_name.trim()) {
                                        const f = new Field(field, props.objectName)
                                        req_fields.push(f)
                                    }
                                }
                            }
                        }
                    } else {
                        for (const field of schema.fields) {
                            if (field.calculated) {
                                continue
                            }
                            if (excludes.indexOf(field.name) === -1) {
                                let f = new Field(field, this)
                                if (f.nillable && f.name !== 'Name') {
                                    fields.push(f)
                                } else {
                                    req_fields.push(f)
                                }

                            }
                        }
                    }
                    req_fields = req_fields.concat(fields)
                    state.fields = req_fields
                    state.obj = {}
                    for (const field of state.fields) {
                        state.obj[field.name] = ref('')
                        if (props.obj) {
                            state.obj[field.name].value = props.obj[field.name]
                        }
                    }
                }
            )

            watch(() => props.id, async () => {
                state.showErrors = false
                if (!props.id) {
                    for (const field of state.fields) {
                        if (state.obj[field.name].value !== '') {
                            state.obj[field.name].value = ''
                        }
                    }
                }
                state.id = props.id
                if (!props.id) {
                    return
                }
                const q = 'select * from {{' + props.objectName + '}} where Id=\'{{ id }}\''
                const data = await contextQuery(q, { 'id': props.id })
                console.log('data loaded', data)
                for (const field of state.fields) {
                    state.obj[field.name].value = data[0][field.name]
                }
            })

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

            const save = () => {
                console.log('save')
                if (!state.isValid) {
                    state.showErrors = true
                    return
                }
                const obj = state.result
                for (let a in obj) {
                    if (obj[a] === null || typeof obj[a] == 'undefined') {
                        if (!obj.fieldsToNull) {
                            obj.fieldsToNull = []
                        }
                        obj.fieldsToNull.push(a)
                        delete obj[a]
                    }
                }
                obj.objectType = props.objectName
                if (props.id) {
                    obj.Id = props.id
                }
                console.info('save form', obj)
                saveObject(obj)
                return true
            }

            const clear = () => {
                for (const field of state.fields) {
                    state.obj[field.name].value = ''
                }
                state.showErrors = false
            }

            return {
                state, save, validate, clear
            }
        }
    }


</script>
