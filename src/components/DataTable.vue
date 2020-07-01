<template>
    <table v-if="tableData.length > 0" class="ui table pitcher mb-6" :class="tableAttr.class" :style="tableAttr.style">
        <thead v-if="!noHeader">
            <tr>
                <!-- If heading-row slot exist, override with a slot -->
                <template v-if="hasHeadingRowSlot">
                    <!-- map only visible fields, return rawData as well -->
                    <slot
                        name="heading-row"
                        :filteredFields="fields.filter(f => !f.hide)"
                        :sortData="sort"
                        :sortTable="sortTable"
                        :getClass="getTHClass"
                    />
                </template>

                <!-- default table heading -->
                <template v-else v-for="f in fields">
                    <th
                        v-if="!f.hide"
                        :key="f.title"
                        :class="getTHClass(f)"
                        :style="{ width: f.width }"
                        @click="f.sortable ? sortTable(f) : null"
                    >
                        <!-- default -->
                        <span :data-tooltip="f.tooltip ? f.title : undefined" :data-position="f.tooltip">
                            <!-- custom header injection -->
                            <template v-if="hasSlot(`${f.title}__slot`)">
                                <slot :name="`${f.title}__slot`" :field="f" />
                            </template>
                            <template v-else>
                                <i v-if="f.icon" class="icon" :class="f.icon" />
                                {{ f.title }}
                            </template>
                        </span>
                    </th>
                </template>
            </tr>
        </thead>
        <tbody>
            <template v-if="hasBodySlot">
                <slot
                    name="body"
                    :tableData="tableData"
                    :mapper="mapper"
                    :filteredFields="fields.filter(f => !f.hide)"
                    :sortData="sort"
                    :pagination="pagination"
                />
            </template>

            <tr v-else v-for="item in tableData" :key="item.__rowID">
                <!-- If row slot exist, override with a slot -->
                <template v-if="hasRowSlot">
                    <!-- map only visible fields, return rawData as well -->
                    <slot
                        name="row"
                        :rowData="getScopeData(item)"
                        :raw="item"
                        :sortData="sort"
                        :pagination="pagination"
                    />
                </template>

                <!-- Default Row content -->
                <template v-else v-for="f in fields">
                    <td v-if="!f.hide" :key="f.title" :class="f.tdClass">
                        <!-- if this field is a slot, get the slot -->
                        <template v-if="!!f.slotName">
                            <slot
                                :name="f.slotName"
                                :rowData="item"
                                :value="mapper(f.dataField, item)"
                                :rowField="f"
                                :sortData="sort"
                            />
                        </template>
                        <!-- otherwise use the prop from data -->
                        <template v-else>
                            <!-- Transform function, return mapped object, root object & field object -->
                            {{
                                f.transform
                                    ? f.transform(mapper(f.dataField, item), item, f)
                                    : mapper(f.dataField, item)
                            }}
                        </template>
                    </td>
                </template>
            </tr>
        </tbody>

        <!-- TFoot slot -->
        <template v-if="hasTFootSlot">
            <tfoot>
                <slot
                    name="t-foot"
                    :sortData="sort"
                    :tableData="tableData"
                    :pagination="pagination"
                    :paginate="paginate"
                />
            </tfoot>
        </template>

        <!-- Pagination -->
        <tfoot v-if="!noPagination && pagination.totalPages > 1">
            <tr>
                <th :colspan="fields.length" :class="`${alignPagination} aligned`">
                    <Pagination :pagination="pagination" :paginate="paginate" :size="paginationSize" />
                </th>
            </tr>
        </tfoot>
    </table>
    <!-- no-data-template slot -->
    <div v-else-if="hasNoDataSlot">
        <slot name="no-data-template" :noDataText="noDataText" />
    </div>
    <!-- default no data text -->
    <div v-else class="pitcher table no-data">
        <span class="ui text large grey center">{{ noDataText }}</span>
    </div>
</template>

<script>
import { defineComponent, computed, reactive, toRefs, watch, onMounted } from '@vue/composition-api'
import orderBy from 'lodash/orderBy'
import range from 'lodash/range'
import Pagination from './DataTable.Pagination.vue'
import { search, uid } from '../utils'

function mapper(key, obj) {
    if (!key) {
        return null
    }

    // map dotted objects
    if (key.includes('.')) {
        return key.split('.').reduce((o, i) => o[i], obj)
    }
    // map simple key
    return obj[key]
}

function sortBy(data, fields, by, order) {
    const field = fields.find(f => f.dataField === by)
    if (!field) {
        return data
    }

    if (typeof field.sortType === 'undefined' || field.sortType === 'string') {
        // sortType: string or sortType: undefined
        return orderBy(data, [by], [order])
    } else if (field.sortType === 'number') {
        // sortType: number
        return orderBy(
            data,
            item => {
                const val = mapper(field.dataField, item) === '' ? -1 : mapper(field.dataField, item)
                return Number(val)
            },
            [order]
        )
    } else if (field.sortType === 'date') {
        // sortType: date
        return orderBy(
            data,
            item => {
                return new Date(mapper(field.dataField, item))
            },
            [order]
        )
    }

    return orderBy(data, [by], [order])
}

export default defineComponent({
    components: {
        Pagination
    },
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
            type: [String, Number],
            default: ''
        },
        searchFields: Array,
        width: {
            type: String,
            default: '100%'
        },
        maxWidth: {
            type: String
        },
        noDataText: {
            type: String,
            default: 'Table has not any data to show'
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
        paginationSize: {
            type: String,
            default: ''
        },
        alignPagination: {
            type: String,
            default: 'right'
        },
        noPagination: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        // Check slots if they exist
        const slotChecks = {
            hasRowSlot: !!slots.row,
            hasHeadingRowSlot: !!slots['heading-row'],
            hasBodySlot: !!slots.body,
            hasTFootSlot: !!slots['t-foot'],
            hasNoDataSlot: !!slots['no-data-template']
        }

        // Local state
        const state = reactive({
            sort: {
                by: '',
                order: ''
            },
            pagination: {
                currentPage: props.initialPage,
                totalPages: Math.ceil(props.data.length / props.perPage),
                startPage: 1,
                endPage: 0,
                startIndex: 0,
                endIndex: 0,
                pages: []
            }
        })

        // Table classes
        const tableAttr = computed(() => ({
            class: {
                sortable: props.fields.some(f => f.sortable),
                'fixed-header': props.fixedHeader
            },
            style: {
                width: props.width,
                maxWidth: props.maxWidth
            }
        }))

        // generate rowID to each row
        props.data.forEach(i => {
            i.__rowID = uid()
        })

        // Where data is distributed to the table
        const tableData = computed(() => {
            let temp = props.data

            // if search word exist
            if (props.searchFor !== '') {
                temp = search(temp, props.searchFor, props.searchFields)
            }

            // sort
            if (state.sort.by) {
                temp = sortBy(temp, props.fields, state.sort.by, state.sort.order)
            }

            // pagination active & paginate
            if (!props.noPagination) {
                calculatePagination(temp)
                temp = temp.slice(state.pagination.startIndex, state.pagination.startIndex + props.perPage)
            }

            return temp
        })

        // Calculate pagination data
        calculatePagination(props.data)

        // Set sort state
        function sortTable(field) {
            // reset sorting for other fields first
            props.fields
                .filter(f => f.dataField !== field.dataField && f.sorted)
                .forEach(f => {
                    if (f.sorted) {
                        delete f.sorted
                        state.sort.order = ''
                    }
                })
            // set sorting by
            state.sort.by = field.dataField
            switch (state.sort.order) {
                case '':
                    state.sort.order = 'asc'
                    field.sorted = 'asc'
                    break
                case 'asc':
                    state.sort.order = 'desc'
                    field.sorted = 'desc'
                    break
                case 'desc':
                    state.sort.by = ''
                    state.sort.order = ''
                    delete field.sorted
                    break
            }
        }

        // helper for building th class
        function getTHClass(f) {
            let cls = f.thClass ? f.thClass : ''
            cls += f.sortable ? ' sortable' : ' no-sort'

            cls += f.sorted ? ' sorted' : ''
            cls += f.sorted && f.sorted === 'desc' ? ' descending' : ' ascending'
            return cls
        }

        // filtered data thru fields
        function getScopeData(item) {
            const filtered = []
            props.fields.forEach(f => {
                if (!f.hide && typeof f.slotName !== 'string') {
                    filtered.push(mapper(f.dataField, item))
                }
            })
            return filtered
        }

        // Calculate pagination data
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
            state.pagination.pages = range(state.pagination.startPage, state.pagination.endPage + 1)
        }

        // Paginate function, this is sent to Pagination component
        function paginate(to) {
            if (state.pagination.currentPage === to) {
                return
            }
            state.pagination.currentPage = to
        }

        // If heading is fixed
        function setHeadingFixed() {
            const tbody = document.querySelector('tbody')
            const scrollWidth = tbody.offsetWidth - tbody.scrollWidth
            const heading = document.querySelector('thead tr')
            const tfoot = document.querySelector('tfoot')
            heading.style.paddingRight = `${scrollWidth}px`
            tfoot.style.display = 'block'
        }

        function hasSlot(name) {
            return !!slots[name]
        }

        onMounted(() => {
            if (props.fixedHeader) {
                setHeadingFixed()
            }
        })

        // to fix pagination in search
        watch(
            () => props.searchFor,
            (newVal, oldVal) => {
                if (oldVal === undefined) {
                    return
                }

                if (newVal.length > 0 && oldVal.length === 0) {
                    paginate(1)
                } else if (newVal.length === 0 && oldVal.length > 0) {
                    paginate(1)
                }
            }
        )
        return {
            ...toRefs(state),
            ...slotChecks,
            tableAttr,
            sortTable,
            getTHClass,
            getScopeData,
            hasSlot,
            tableData,
            paginate,
            mapper
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

    // Styles for fixed heading
    &.fixed-header {
        display: flex;
        flex-direction: column;
        height: 100%;

        thead,
        tbody {
            display: block;
        }

        thead {
            margin-right: 0px;

            tr {
                background-color: #f9fafb;

                td:first-child,
                td:last-child {
                    border-radius: 0 !important;
                }
            }
        }

        tbody {
            flex: 1;
            overflow-y: scroll;
        }

        tr {
            width: 100%;
            display: flex;
        }

        tr td,
        tr th {
            display: block;
            flex: 1;
        }
    }
}
// No data style
.pitcher.table.no-data {
    text-align: center;
    padding: 8px 0;
}
</style>
