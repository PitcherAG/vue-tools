<template>
    <table class="ui table pitcher sortable mb-6" :class="tableClasses">
        <thead>
            <tr v-if="!hideHeader">
                <!-- If heading-row slot exist, override with a slot -->
                <template v-if="hasHeadingRowSlot">
                    <!-- map only visible fields, return rawData as well -->
                    <slot
                        name="heading-row"
                        :fields="fields.filter(f => !f.hide)"
                        :raw="fields"
                        :sort="sort"
                        :getClass="getTHClass"
                    />
                </template>
                <template v-else v-for="f in fields">
                    <!-- default table heading -->
                    <th
                        v-if="!f.hide"
                        :key="f.name"
                        :class="getTHClass(f)"
                        @click="f.sortable ? sort(f.dataField) : null"
                    >
                        <i v-if="f.icon" class="icon" :class="f.icon" />
                        {{ f.title }}
                    </th>
                </template>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, dKey) in tableData" :key="dKey">
                <!-- If row slot exist, override with a slot -->
                <template v-if="hasRowSlot">
                    <!-- map only visible fields, return rawData as well -->
                    <slot name="row" :rowData="getScopeData(item)" :raw="item" />
                </template>

                <!-- Default Row content -->
                <template v-else v-for="(f, fKey) in fields">
                    <td v-if="!f.hide" :key="fKey" :class="f.trClass">
                        <!-- if this field is a slot, get the slot -->
                        <template v-if="f.dataField.includes('__slot:')">
                            <slot :name="f.dataField.replace('__slot:', '')" :data="item" />
                        </template>
                        <!-- otherwise use the prop from data -->
                        <template v-else>
                            {{ f.transform ? f.transform(item[f.dataField]) : item[f.dataField] }}
                        </template>
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from '@vue/composition-api'
import _ from 'lodash'

function sortBy(data, by, order) {
    return _.orderBy(data, [by], [order])
}

export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        hideHeader: {
            type: Boolean,
            default: false
        },
        sortable: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        const tableClasses = {
            sortable: props.sortable
        }

        const slotChecks = {
            hasRowSlot: !!slots.row,
            hasHeadingRowSlot: !!slots['heading-row']
        }

        const state = reactive({
            sortBy: '',
            sortOrder: ''
        })

        const tableData = computed(() => {
            let temp = props.data

            if (state.sortBy) {
                temp = sortBy(props.data, state.sortBy, state.sortOrder)
            }

            return temp
        })

        function sort(by) {
            state.sortBy = by
            switch (state.sortOrder) {
                case '':
                    state.sortOrder = 'asc'
                    break
                case 'asc':
                    state.sortOrder = 'desc'
                    break
                case 'desc':
                    state.sortBy = ''
                    state.sortOrder = ''
                    break
            }
        }

        function getTHClass(f) {
            let cls = f.thClass
            cls += f.sortable ? ' sortable' : ' no-sort'

            cls += state.sortBy === f.dataField ? ' sorted' : ''
            cls += state.sortBy === f.dataField && state.sortOrder === 'desc' ? ' descending' : ' ascending'
            return cls
        }

        // filtered data thru fields
        function getScopeData(item) {
            const filtered = []
            props.fields.forEach(f => {
                if (!f.hide && !f.dataField.includes('__slot:')) {
                    filtered.push(item[f.dataField])
                }
            })
            return filtered
        }

        return { ...toRefs(state), tableClasses, ...slotChecks, sort, getTHClass, getScopeData, tableData }
    }
})
</script>

<style lang="scss" scoped>
.ui.table.pitcher {
    &.sortable {
        // disable text selection
        > thead > tr > th {
            user-select: none;
        }

        // disable non-sortable th hover effect
        > thead > tr > th.no-sort:hover {
            cursor: default !important;
            background: #f9fafb !important;
        }
    }
}
</style>
