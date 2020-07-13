<template>
    <div class="pt-4 fill-height">
        <h3>Data Table</h3>
        <div class="ui divider" />
        <div class="ui input">
            <input type="text" v-model="options.searchFor" />
        </div>
        <DataTable class="celled" :data="data" :fields="fields" v-bind="options">
            <template #prepend-tbody="{ mapper }">
                <tr>
                    <td colspan="2">Prepend Test</td>
                    <td>Test</td>
                    <td colspan="3" />
                    <td>test</td>
                </tr>
            </template>
            <template #append-tbody="{ mapper }">
                <tr>
                    <td colspan="2">Append test</td>
                    <td colspan="4">test</td>
                </tr>
            </template>
            <!-- <template #heading-row="{ fields, sort, getClass }">
                <th v-for="(f, fKey) in fields" :key="fKey" @click="sort(f.dataField)" :class="getClass(f)">
                    <i v-if="f.icon" class="icon" :class="f.icon" />
                    {{ f.title }}
                </th>
            </template> -->
            <!-- <template #row="{ rowData, raw }">
                <td v-for="(d, dKey) in rowData" :key="dKey">
                    {{ d }}
                </td>
                <td>
                    action button
                </td>
            </template> -->
            <!-- <template #body="{ tableData, pagination, fields }">
                <tr v-for="(row, rKey) in tableData" :key="rKey">
                    <td v-for="(col, cKey) in row" :key="cKey">
                        {{ col }}
                    </td>
                </tr>
                <tr v-for="(row, rKey) in tableData" :key="rKey">
                    <template v-for="(f, fKey) in fields">
                        <td v-if="!f.hide" :key="fKey">
                            if this field is not a slot
                            <template v-if="!f.slotName">
                                {{ f.transform ? f.transform(row[f.dataField]) : row[f.dataField] }}
                            </template>
                        </td>
                    </template>
                </tr>
            </template> -->
            <template #actions="{ value }">
                <button class="ui button basic right aligned">
                    <i class="icon edit" />
                    {{ value }}
                </button>
            </template>
            <!-- <template #t-foot="{ pagination, paginate }">
                <tr>
                    <th><Pagination :pagination="pagination" :paginate="paginate" /></th>
                    <th colspan="6">
                        <div class="ui right floated small primary labeled icon button">
                            <i class="user icon"></i> Add User
                        </div>
                        <div class="ui small  button">
                            Approve
                        </div>
                        <div class="ui small  disabled button">
                            Approve All
                        </div>
                    </th>
                </tr>
            </template> -->
            <!-- <template #no-data-template>
                <span class="ui text large grey center">Test</span>
            </template> -->
        </DataTable>
    </div>
</template>

<script>
import Pagination from '@/components/DataTable.Pagination'
import DataTable from '@/components/DataTable'
import { reactive, toRefs } from '@vue/composition-api'
import data from './dummy.table.js'

export default {
    components: {
        Pagination,
        DataTable
    },
    props: {},
    setup() {
        const state = reactive({
            data,
            options: {
                searchFor: '',
                noHeader: false,
                noPagination: false,
                // noDataText: '',
                fixedHeader: false,
                width: '100%',
                perPage: 10
            },
            fields: [
                {
                    title: 'Id',
                    dataField: 'id',
                    hide: true
                },
                {
                    title: 'Title',
                    dataField: 'title',
                    icon: 'cog',
                    // width: '25px',
                    thClass: 'left aligned',
                    tdClass: 'left aligned',
                    sortable: true,
                    tooltip: 'top left',
                    tooltipText: 'Testing the tooltip'
                },
                {
                    title: 'Url',
                    dataField: 'url',
                    thClass: 'left aligned',
                    tdClass: 'left aligned',
                    transform: val => `url: ${val}`
                },
                {
                    title: 'Test.Relation',
                    dataField: 'test.nested.another.hulo',
                    thClass: 'left aligned',
                    tdClass: 'left aligned',
                    sortable: true,
                    sortType: 'string'
                },
                {
                    title: 'Count',
                    dataField: 'count',
                    thClass: 'center aligned',
                    tdClass: 'center aligned',
                    sortable: true,
                    sortType: 'number'
                },
                {
                    title: 'Total',
                    dataField: 'total',
                    thClass: 'right aligned',
                    tdClass: 'right aligned',
                    sortable: true,
                    sortType: 'number'
                },
                {
                    title: 'Created Date',
                    dataField: 'createdDate',
                    thClass: 'center aligned',
                    tdClass: 'center aligned',
                    sortable: true,
                    sortType: 'date'
                },
                {
                    title: 'Actions',
                    slotName: 'actions',
                    thClass: 'center aligned',
                    tdClass: 'center aligned'
                }
            ]
        })

        return { ...toRefs(state) }
    }
}
</script>
