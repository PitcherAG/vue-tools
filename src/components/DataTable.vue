<template>
    <table class="ui table pitcher mb-6" :class="tableClasses">
        <thead>
            <tr v-if="!noHeader">
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
                        :colspan="f.colspan"
                        :style="{ width: f.width }"
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
                    <td v-if="!f.hide" :key="fKey" :class="f.tdClass">
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
        <!-- TFoot slot -->
        <template v-if="hasTFootSlot">
            <tfoot>
                <slot name="t-foot" />
            </tfoot>
        </template>
        <tfoot>
            <tr>
                <th :colspan="fields.length" class="right aligned">
                    <div class="ui pagination menu">
                        <a class="item icon">
                            <i class="icon angle double left" />
                        </a>
                        <a class="item icon" @click="paginate(pagination.currentPage - 1)">
                            <i class="icon chevron left" />
                        </a>
                        <a class="item">
                            {{ pagination.startPage }}
                        </a>
                        <a class="active item">
                            a
                        </a>
                        <a class="item">
                            b
                        </a>
                        <div class="disabled item">
                            ...
                        </div>
                        <a class="item">
                            x
                        </a>
                        <!-- <a class="item">
                            {{ pagination.totalPages }}
                        </a> -->
                        <a class="item">
                            {{ pagination.endPage }}
                        </a>
                        <a class="item icon" @click="paginate(pagination.currentPage + 1)">
                            <i class="icon chevron right" />
                        </a>
                        <a class="item icon">
                            <i class="icon angle double right" />
                        </a>
                    </div>
                </th>
            </tr>
        </tfoot>
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
        searchFor: {
            type: [String, Number]
        },
        searchFields: {
            type: Array
        },
        noDataTemplate: {
            type: String,
            default: 'No data available.'
        },
        noHeader: {
            type: Boolean,
            default: false
        },
        fixedHeader: {
            type: Boolean,
            default: false
        },
        // Pagination related
        initialPage: {
            type: Number,
            default: 1
        },
        perPage: {
            type: Number,
            default: 10
        }
    },
    setup(props, { slots }) {
        const tableClasses = {
            sortable: props.fields.some(f => f.sortable)
        }

        const slotChecks = {
            hasRowSlot: !!slots.row,
            hasHeadingRowSlot: !!slots['heading-row'],
            hasTFootSlot: !!slots['t-foot']
        }

        const state = reactive({
            sortBy: '',
            sortOrder: '',
            pagination: {
                currentPage: props.initialPage || 1,
                totalPages: Math.ceil(props.data.length / props.perPage),
                startPage: 1,
                endPage: 10,
                startIndex: 1,
                endIndex: 0,
                pages: 0
            }
        })

        calculatePagination()

        const tableData = computed(() => {
            let temp = props.data

            if (state.sortBy) {
                temp = sortBy(props.data, state.sortBy, state.sortOrder)
            }

            // pagination
            return temp.slice(state.pagination.startIndex, state.pagination.startIndex + props.perPage)
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

        function calculatePagination() {
            if (state.pagination.totalPages <= 10) {
                // less than 10 total pages so show all
                state.pagination.startPage = 1
                state.pagination.endPage = state.pagination.totalPages
            } else {
                // more than 10 total pages so calculate start and end pages
                if (state.pagination.currentPage <= 6) {
                    state.pagination.startPage = 1
                    state.pagination.endPage = 10
                } else if (state.pagination.currentPage + 4 >= state.pagination.totalPages) {
                    state.pagination.startPage = state.pagination.totalPages - 9
                    state.pagination.endPage = state.pagination.totalPages
                } else {
                    state.pagination.startPage = state.pagination.currentPage - 5
                    state.pagination.endPage = state.pagination.currentPage + 4
                }
            }
            state.pagination.startIndex = (state.pagination.currentPage - 1) * props.perPage
            state.pagination.endIndex = state.pagination.startIndex + props.perPage
            state.pagination.pages = _.range(state.pagination.startPage, state.pagination.endPage + 1)
            console.log('current', state.pagination.currentPage)
            console.log('pages', state.pagination.pages)
            console.log('pagi', state.pagination)
        }

        function paginate(to) {
            state.pagination.currentPage = to
            calculatePagination()
        }

        return { ...toRefs(state), tableClasses, ...slotChecks, sort, getTHClass, getScopeData, tableData, paginate }
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
