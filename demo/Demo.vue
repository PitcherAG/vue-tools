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
        <DataTable :data="data" :fields="fields" celled>

            <!-- <template #heading-row="{ rowData }">
                <th v-for="(d, dKey) in rowData" :key="dKey">
                    {{ d.title }}
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
            fields: [
                {
                    title: 'Id',
                    dataField: 'id',
                    hide: true
                },
                {
                    title: 'Title',
                    width: '3%',
                    dataField: 'title',
                    dataClass: 'left aligned',
                    contentClass: 'left aligned'
                },
                {
                    title: 'Url',
                    width: '3%',
                    dataField: 'url',
                    dataClass: 'left aligned',
                    contentClass: 'left aligned'
                },
                {
                    title: 'Favorite',
                    width: '3%',
                    dataField: 'isFavorite',
                    dataClass: 'left aligned',
                    contentClass: 'left aligned'
                },
                {
                    title: 'In Board',
                    width: '3%',
                    dataField: 'isInBoard',
                    dataClass: 'center aligned',
                    contentClass: 'center aligned'
                },
                {
                    title: 'New',
                    width: '3%',
                    dataField: 'isNew',
                    dataClass: 'right aligned',
                    contentClass: 'right aligned'
                },
                {
                    title: 'Created Date',
                    width: '3%',
                    dataField: 'createdDate',
                    dataClass: 'center aligned',
                    contentClass: 'center aligned'
                },
                {
                    title: 'Actions',
                    width: '3%',
                    dataField: '__slot:actions',
                    dataClass: 'center aligned',
                    contentClass: 'center aligned',
                    collapse: true
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
