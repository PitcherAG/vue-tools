import DataTable from './DataTable.vue'
import { data, fields } from './data.table'


export default {
    title: 'Components/DataTable',
    component: DataTable,
    argTypes: {
        // size: { control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'] } },
        // color: {
        //     control: {
        //         type: 'select',
        //         options: ['basic', 'striped', 'celled']
        //     }
        // }
    },
    args: {
      data: data,
      fields: fields
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DataTable },
    template: '<DataTable v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {}
