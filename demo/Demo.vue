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
        <DataTable class="celled" :data="data" :fields="fields" celled>
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
            <template #actions>
                <button class="ui button basic right aligned">
                    <i class="icon edit" />
                    Edit
                </button>
            </template>
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
                // TODO
                searchFor: '',
                searchFields: ['title', 'url']
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
                    width: '3%', // TODO
                    thClass: 'left aligned',
                    trClass: 'left aligned',
                    sortable: true
                },
                {
                    title: 'Url',
                    dataField: 'url',
                    width: '3%',
                    thClass: 'left aligned',
                    trClass: 'left aligned',
                    transform: val => `url: ${val}`
                },
                {
                    title: 'Favorite',
                    dataField: 'isFavorite',
                    width: '3%',
                    thClass: 'left aligned',
                    trClass: 'left aligned'
                },
                {
                    title: 'In Board',
                    dataField: 'isInBoard',
                    width: '3%',
                    thClass: 'center aligned',
                    trClass: 'center aligned'
                },
                {
                    title: 'New',
                    dataField: 'isNew',
                    width: '3%',
                    thClass: 'right aligned',
                    trClass: 'right aligned'
                },
                {
                    title: 'Created Date',
                    dataField: 'createdDate',
                    width: '3%',
                    thClass: 'center aligned',
                    trClass: 'center aligned',
                    sortable: true
                },
                {
                    title: 'Actions',
                    dataField: '__slot:actions',
                    width: '3%',
                    thClass: 'center aligned',
                    trClass: 'center aligned'
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
