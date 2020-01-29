<template>
    <div>
        <sui-form>
            <ObjectFormField :field="field" v-for="(field, key) in state.fields" :key="key"></ObjectFormField>
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
        props: ['item', 'hasSave'],
        setup(props) {
            const configStore = useConfigStore()
            const excludes = ['attributes', 'Id', 'CreatedById', 'CreatedDate', 'Division', 'IsDeleted', 'LastActivityDate', 'LastModifiedById', 'LastModifiedDate', 'SystemModstamp']
            const state = reactive({
                fields: [],
                dict: {},
                id: null,
                table: computed(() => configStore.getTableDict[props.item.PITCH_CPG__Source__c]),
                isValid: false,
                result: computed(() => {
                    const result = {}
                    let valid = true
                    for (const field of state.fields) {
                        result[field.name] = field.answer.value
                        if (!field.nillable && (typeof field.answer.value == 'undefined' || String(field.answer.value) === 'null')) {
                            valid = false
                        }
                    }
                    state.isValid = valid
                    return result
                })
            })
            const id = ref(null)
            watch(
                async () => {
                    if (!props.item) {
                        return
                    }
                    let fields = []
                    let req_fields = []
                    const schema = await loadSchema(props.item.PITCH_CPG__Source__c)
                    console.log(schema)
                    if (!schema) {
                        return
                    }
                    const includeFields = props.item.PITCH_CPG__Logic__c.split(',')

                    if (includeFields.length) {
                        for (const field_name of includeFields) {
                            for (const field of schema.fields) {
                                if (field.name === field_name.trim()) {
                                    const f = new Field(field, props.item.PITCH_CPG__Source__c)
                                    state.dict[f.name] = f
                                    req_fields.push(f)
                                }
                            }

                        }
                    } else {
                        for (const field of schema.fields) {
                            if (field.calculated) {
                                continue
                            }
                            if (excludes.indexOf(field.name) == -1) {
                                let f = new Field(field, this)
                                state.dict[f.name] = f
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
                }
            )

            const obj = ref({})

            watch(
                async () => {
                    if (!id.value) {
                        return
                    }
                    const q = 'select * from {{' + props.item.PITCH_CPG__Source__c + '}} where Id=\'{{ id }}\''
                    const data = await contextQuery(q, { 'id': id.value })
                    obj.value = data
                }
            )
            const save = () => {
                if (!state.isValid) {
                    return
                }
                const obj = state.result.value
                for (let a in obj) {
                    if (obj[a] === null || typeof obj[a] == 'undefined') {
                        if (!obj.fieldsToNull) {
                            obj.fieldsToNull = []
                        }
                        obj.fieldsToNull.push(a)
                        delete obj[a]
                    }
                }
                obj.objectType = props.item.PITCH_CPG__Source__c
                if (id.value) {
                    obj.Id = id.value
                }

                console.log('save form', obj)
                saveObject(obj)
            }

            return {
                obj, state, id, save
            }
        }
    }


</script>
