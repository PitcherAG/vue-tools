import DataTable from '../../components/DataTable/DataTable.vue'
import { data, fields } from './data.table'

export default {
    title: 'Components/DataTable',
    component: DataTable,
    argTypes: {},
    args: {
        data: data,
        fields: fields,
        perPage: 5,
        searchOptions: { threshold: 0.15, distance: 1000, useExtendedSearch: true }
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DataTable },
    template: '<DataTable v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {}
