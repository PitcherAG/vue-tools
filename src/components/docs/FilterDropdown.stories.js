import FilterDropdown from '../FilterDropdown'
import { options } from './data.dropdown'


export default {
    title: 'Components/FilterDropdown',
    component: FilterDropdown,
    argTypes: {
        size: { control: { type: 'select', options: ['tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'] } },
        color: {
            control: {
                type: 'select',
                options: ['primary', 'inverted']
            }
        }
    },
    args: {
        title: "Cities",
        width: 200,
        value: [],
        items: [
            {
                text: 'Cantons',
                type: 'header',
                description: 5
            },
            {
                text: 'Zürich',
                value: 'zurich',
                description: 15
            },
            {
                type: 'divider'
            },
            {
                text: 'Aargau',
                value: 'aargau',
                description: 2
            },
            {
                text: 'Vaud',
                value: 'vaud',
                disabled: true,
                description: 0
            },
            {
                text: 'Ticino',
                value: 'ticino',
                description: 3
            },
            {
                text: 'Bern',
                value: 'bern',
                description: 12
            },
            {
                text: 'Lucerne',
                value: 'lucerne',
                description: 123
            },
            {
                text: 'Geneva',
                value: 'geneva',
                description: 44
            }
        ]
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FilterDropdown },
    template: '<FilterDropdown v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {}