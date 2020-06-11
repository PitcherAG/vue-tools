<template>
    <div class="pt-4 fill-height">
        <h2>Demo Page</h2>
        <div class="ui divider" />
        <!-- <NumpadInput v-model="test" placeholder="test" group="test" />
        <NumpadInput v-model="test2" placeholder="test" group="test" />
        <br />
        <br />
        <Dropdown
            defaultText="Select Record Type"
            v-model="recordTypeSaved"
            :options="recordTypes"
            text-field="text"
            value-field="value"
        /> -->
        <div class="ui input">
            <input type="text" v-model="options.searchFor" />
        </div>
        <DataTable class="celled" :data="data" :fields="fields" v-bind="options">
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
                            <template v-if="!f.dataField.includes('__slot:')">
                                {{ f.transform ? f.transform(row[f.dataField]) : row[f.dataField] }}
                            </template>
                        </td>
                    </template>
                </tr>
            </template> -->
            <template #actions>
                <button class="ui button basic right aligned">
                    <i class="icon edit" />
                    Edit
                </button>
            </template>
            <!-- <template #t-foot>
                <tr>
                    <th></th>
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
import NumpadInput from '@/components/NumpadInput'
import Dropdown from '@/components/Dropdown'
import DataTable from '@/components/DataTable'
import { reactive, toRefs } from '@vue/composition-api'
import data from './dummy'

export default {
    components: {
        NumpadInput,
        Dropdown,
        DataTable
    },
    props: {},
    setup() {
        const state = reactive({
            data,
            options: {
                searchFor: '',
                searchFields: ['title', 'url'],
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
                    sortable: true
                },
                {
                    title: 'Url',
                    dataField: 'url',
                    thClass: 'left aligned',
                    tdClass: 'left aligned',
                    transform: val => `url: ${val}`
                },
                {
                    title: 'Favorite',
                    dataField: 'isFavorite',
                    thClass: 'left aligned',
                    tdClass: 'left aligned'
                },
                {
                    title: 'In Board',
                    dataField: 'isInBoard',
                    thClass: 'center aligned',
                    tdClass: 'center aligned'
                },
                {
                    title: 'New',
                    dataField: 'isNew',
                    thClass: 'right aligned',
                    tdClass: 'right aligned'
                },
                {
                    title: 'Created Date',
                    dataField: 'createdDate',
                    thClass: 'center aligned',
                    tdClass: 'center aligned',
                    sortable: true
                },
                {
                    title: 'Actions',
                    dataField: '__slot:actions',
                    thClass: 'center aligned',
                    tdClass: 'center aligned'
                }
            ]
            // test: '',
            // test2: '',
            // recordTypeSaved: 'test1',
            // recordTypes: [
            //     {
            //         text: 'test 1',
            //         value: 'test1'
            //     },
            //     {
            //         text: 'test 2',
            //         value: 'test2'
            //     },
            //     {
            //         text: 'test 3',
            //         value: 'test3'
            //     }
            // ]
        })

        return { ...toRefs(state) }
    }
}
</script>

<style lang="scss">
//
</style>
