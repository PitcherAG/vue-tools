<template>
    <table v-if="tableData.length > 0" class="ui table pitcher mb-6" :class="tableClasses">
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
        <!-- Pagination -->
        <tfoot v-if="!noPagination && pagination.totalPages > 1">
            <tr>
                <th :colspan="fields.length" class="right aligned">
                    <div class="ui pagination menu">
                        <a class="item icon" :class="{ disabled: pagination.currentPage === 1 }" @click="paginate(1)">
                            <i class="icon angle double left" />
                        </a>
                        <a
                            class="item icon"
                            :class="{ disabled: pagination.currentPage === 1 }"
                            @click="paginate(pagination.currentPage - 1)"
                        >
                            <i class="icon chevron left" />
                        </a>
                        <a
                            v-for="(p, i) in pagination.pages"
                            class="item"
                            :key="i"
                            :class="{ active: p === pagination.currentPage }"
                            @click="paginate(p)"
                        >
                            {{ p }}
                        </a>
                        <a
                            class="item icon"
                            :class="{ disabled: pagination.totalPages === pagination.currentPage }"
                            @click="paginate(pagination.currentPage + 1)"
                        >
                            <i class="icon chevron right" />
                        </a>
                        <a
                            class="item icon"
                            :class="{ disabled: pagination.totalPages === pagination.currentPage }"
                            @click="paginate(pagination.totalPages)"
                        >
                            <i class="icon angle double right" />
                        </a>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
    <!-- no-data-template slot -->
    <div v-else-if="hasNoDataSlot">
        <slot name="no-data-template" />
    </div>
    <!-- default no data text -->
    <div v-else class="pitcher table no-data">
        <span class="ui text large grey center">{{ noDataText }}</span>
    </div>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from '@vue/composition-api'
import _ from 'lodash'
import { searchObjectArray } from '@/utils'

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
            type: Array,
            default: () => []
        },
        noDataText: {
            type: String,
            default: 'Table has not any data to show.'
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
            default: 15
        },
        totalVisible: {
            type: Number,
            default: 5
        },
        noPagination: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        const tableClasses = {
            sortable: props.fields.some(f => f.sortable)
        }

        const slotChecks = {
            hasRowSlot: !!slots.row,
            hasHeadingRowSlot: !!slots['heading-row'],
            hasTFootSlot: !!slots['t-foot'],
            hasNoDataSlot: !!slots['no-data-template']
        }

        const state = reactive({
            sortBy: '',
            sortOrder: '',
            pagination: {
                currentPage: props.initialPage,
                totalPages: Math.ceil(props.data.length / props.perPage),
                startPage: 1,
                endPage: 0,
                startIndex: 1,
                endIndex: 0,
                pages: 0
            }
        })

        calculatePagination(props.data)

        const tableData = computed(() => {
            let temp = props.data

            if (props.searchFor !== '') {
                temp = searchObjectArray(temp, props.searchFor, props.searchFields)
            }

            // pagination active
            if (!props.noPagination) {
                calculatePagination(temp)
                temp = temp.slice(state.pagination.startIndex, state.pagination.startIndex + props.perPage)
            }

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

        function calculatePagination(data) {
            if (props.noPagination) {
                return
            }

            state.pagination.totalPages = Math.ceil(data.length / props.perPage)
            if (state.pagination.totalPages <= 10) {
                // less than 10 total pages so show all
                state.pagination.startPage = 1
                state.pagination.endPage = state.pagination.totalPages
            } else {
                // more than 10 total pages so calculate start and end pages
                if (state.pagination.currentPage <= props.totalVisible / 2) {
                    // Current near start
                    state.pagination.startPage = 1
                    state.pagination.endPage = props.totalVisible
                } else if (
                    state.pagination.currentPage + Math.floor(props.totalVisible / 2) >=
                    state.pagination.totalPages
                ) {
                    // Current near end
                    state.pagination.startPage = state.pagination.totalPages - (props.totalVisible - 1)
                    state.pagination.endPage = state.pagination.totalPages
                } else if (state.pagination.currentPage >= props.totalVisible / 2) {
                    // Current in mid
                    state.pagination.startPage = state.pagination.currentPage - Math.floor(props.totalVisible / 2)
                    state.pagination.endPage = state.pagination.currentPage + Math.floor(props.totalVisible / 2)
                }
            }
            state.pagination.startIndex = (state.pagination.currentPage - 1) * props.perPage
            state.pagination.endIndex = state.pagination.startIndex + props.perPage
            state.pagination.pages = _.range(state.pagination.startPage, state.pagination.endPage + 1)
        }

        function paginate(to) {
            if (state.pagination.currentPage === to) {
                return
            }
            state.pagination.currentPage = to
        }

        return {
            ...toRefs(state),
            tableClasses,
            ...slotChecks,
            sort,
            getTHClass,
            getScopeData,
            tableData,
            paginate
        }
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
.pitcher.table.no-data {
    text-align: center;
    padding: 8px 0;
}
</style>
